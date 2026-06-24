from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
from .models import FilterRequest, UploadResponse, MetadataResponse
from .services.data_service import DataService

app = FastAPI(title="Market Data Explorer - Python Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_service = DataService()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "Market Data Explorer API", "status": "running"}

@app.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith('.feather'):
        raise HTTPException(status_code=400, detail="Only .feather files are allowed")
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    
    try:
        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Validate and load the feather file
        row_count = data_service.load_feather(file_path)
        
        if row_count == 0:
            raise HTTPException(status_code=400, detail="Feather file is empty")
        
        return UploadResponse(rows=row_count, filename=file.filename)
    except ValueError as ve:
        # Handle data validation errors
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        # Clean up file on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/metadata", response_model=MetadataResponse)
async def get_metadata():
    try:
        metadata = data_service.get_metadata()
        return MetadataResponse(**metadata)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting metadata: {str(e)}")

@app.post("/filter")
async def get_filtered_data(request: FilterRequest):
    try:
        data = data_service.get_filtered_data(
            expiry=request.expiry,
            strike=request.strike,
            instrument=request.instrument
        )
        return {"data": data, "count": len(data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error filtering data: {str(e)}")

@app.get("/expiries/{instrument}")
async def get_expiries_by_instrument(instrument: str):
    try:
        expiries = data_service.get_expiries_by_instrument(instrument)
        return {"instrument": instrument, "expiries": expiries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/strikes/{instrument}")
async def get_strikes_by_instrument(instrument: str):
    try:
        strikes = data_service.get_strikes_by_instrument(instrument)
        return {"instrument": instrument, "strikes": strikes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/contract-counts")
async def get_contract_counts():
    try:
        counts = data_service.get_contract_counts()
        return counts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/data-preview")
async def get_data_preview(limit: int = 100, offset: int = 0):
    try:
        if data_service.df is None:
            return {"data": [], "total": 0}
        df = data_service.df
        total = len(df)
        preview = df.iloc[offset:offset+limit].to_dict(orient='records')
        return {"data": preview, "total": total, "limit": limit, "offset": offset}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
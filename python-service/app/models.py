from pydantic import BaseModel
from typing import List, Optional

class FilterRequest(BaseModel):
    expiry: Optional[str] = None
    strike: Optional[int] = None
    instrument: Optional[str] = None

class UploadResponse(BaseModel):
    rows: int
    filename: str

class MetadataResponse(BaseModel):
    expiries: List[str]
    strikes: List[int]
    instruments: List[str]
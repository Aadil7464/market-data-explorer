import pandas as pd
import os
from typing import Dict, Any, List, Optional

class DataService:
    def __init__(self):
        self.df: Optional[pd.DataFrame] = None
        self.file_path: Optional[str] = None

    def load_feather(self, file_path: str) -> int:
        self.file_path = file_path
        try:
            self.df = pd.read_feather(file_path)
        except Exception as e:
            raise ValueError(f"Failed to read feather file: {str(e)}")
        
        try:
            if 'Timestamp' in self.df.columns:
                self.df['Timestamp'] = pd.to_datetime(self.df['Timestamp'], errors='coerce')
            if 'Expiry' in self.df.columns:
                # Handle both string and datetime formats
                self.df['Expiry'] = pd.to_datetime(self.df['Expiry'], errors='coerce').dt.strftime('%Y-%m-%d')
            if 'Strike' in self.df.columns:
                # Ensure Strike is numeric
                self.df['Strike'] = pd.to_numeric(self.df['Strike'], errors='coerce')
        except Exception as e:
            raise ValueError(f"Failed to process data columns: {str(e)}")
        
        return len(self.df)

    def get_metadata(self) -> Dict[str, Any]:
        if self.df is None:
            return {"expiries": [], "strikes": [], "instruments": []}
        expiries = sorted(self.df['Expiry'].unique().tolist()) if 'Expiry' in self.df.columns else []
        strikes = sorted(self.df['Strike'].unique().tolist()) if 'Strike' in self.df.columns else []
        instruments = sorted(self.df['Instrument'].unique().tolist()) if 'Instrument' in self.df.columns else []
        return {"expiries": expiries, "strikes": strikes, "instruments": instruments}

    def get_filtered_data(self, expiry: Optional[str] = None, 
                          strike: Optional[int] = None, 
                          instrument: Optional[str] = None) -> List[Dict]:
        if self.df is None:
            return []
        filtered_df = self.df.copy()
        if expiry:
            filtered_df = filtered_df[filtered_df['Expiry'] == expiry]
        if strike is not None:
            filtered_df = filtered_df[filtered_df['Strike'] == strike]
        if instrument:
            filtered_df = filtered_df[filtered_df['Instrument'] == instrument]
        return filtered_df.to_dict(orient='records')

    def get_expiries_by_instrument(self, instrument: str) -> List[str]:
        if self.df is None:
            return []
        filtered = self.df[self.df['Instrument'] == instrument]
        expiries = filtered['Expiry'].unique().tolist() if 'Expiry' in filtered.columns else []
        return sorted(expiries)

    def get_strikes_by_instrument(self, instrument: str) -> List[int]:
        if self.df is None:
            return []
        filtered = self.df[self.df['Instrument'] == instrument]
        strikes = filtered['Strike'].unique().tolist() if 'Strike' in filtered.columns else []
        return sorted(strikes)

    def get_contract_counts(self) -> Dict[str, int]:
        if self.df is None:
            return {"CE": 0, "PE": 0, "FUT": 0}
        counts = {}
        for inst in ['CE', 'PE', 'FUT']:
            counts[inst] = len(self.df[self.df['Instrument'] == inst])
        return counts
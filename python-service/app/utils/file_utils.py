import pandas as pd
import os

def validate_feather(file_path: str) -> bool:
    try:
        pd.read_feather(file_path, nthreads=1)
        return True
    except Exception:
        return False
"""
Market Data Explorer - Python Service
FastAPI application for processing Feather files
"""

__version__ = "1.0.0"
__author__ = "Market Data Team"

from .main import app
from .models import FilterRequest, UploadResponse, MetadataResponse
from .services.data_service import DataService

__all__ = [
    "app",
    "FilterRequest",
    "UploadResponse", 
    "MetadataResponse",
    "DataService"
]
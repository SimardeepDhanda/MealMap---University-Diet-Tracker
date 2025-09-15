from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from selenium_scraper import scrape_and_save_selenium
import logging

router = APIRouter(prefix="/admin", tags=["admin"])

logger = logging.getLogger(__name__)

@router.post("/scrape")
def trigger_scraper(db: Session = Depends(get_db)):
    """Trigger the Selenium-based scraper to get real meal data from McMaster dining site"""
    try:
        logger.info("Admin triggered Selenium scraper")
        
        # Use the new Selenium scraper
        count = scrape_and_save_selenium(db)
        
        return {
            "message": f"Selenium scraper completed successfully",
            "meals_processed": count,
            "scraper_type": "Selenium (interactive)"
        }
        
    except Exception as e:
        logger.error(f"Scraper failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Scraper failed: {str(e)}") 
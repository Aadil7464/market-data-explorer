"""
Generate sample market data feather file for Market Data Explorer
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

def generate_market_data(num_records=10000):
    """
    Generate synthetic option/futures market data
    
    Args:
        num_records: Number of records to generate
        
    Returns:
        pd.DataFrame: Generated market data
    """
    # Base dates
    base_date = datetime(2026, 6, 1)
    
    # Expiry dates - different for different instruments
    # CE expiries - weekly and monthly
    ce_expiries = [
        '2026-06-26',  # Weekly
        '2026-07-03',  # Weekly
        '2026-07-10',  # Weekly
        '2026-07-17',  # Weekly
        '2026-07-24',  # Weekly
        '2026-07-31',  # Monthly
        '2026-08-28',  # Monthly
    ]
    
    # PE expiries - different from CE
    pe_expiries = [
        '2026-06-25',  # Weekly (different date)
        '2026-07-02',  # Weekly
        '2026-07-09',  # Weekly
        '2026-07-16',  # Weekly
        '2026-07-23',  # Weekly
        '2026-07-30',  # Monthly
        '2026-08-27',  # Monthly
    ]
    
    # FUT expiries - only monthly and different dates
    fut_expiries = [
        '2026-06-30',  # Monthly expiry
        '2026-07-31',  # Monthly expiry
        '2026-08-31',  # Monthly expiry
        '2026-09-30',  # Monthly expiry
    ]
    
    # Instruments with their specific expiries
    instrument_expiry_map = {
        'CE': ce_expiries,
        'PE': pe_expiries,
        'FUT': fut_expiries
    }
    
    # Strikes (NIFTY levels)
    strikes = list(range(24800, 25300, 50))  # 24800 to 25250 in steps of 50
    
    data = []
    
    for i in range(num_records):
        # Randomly select instrument
        instrument = random.choice(['CE', 'PE', 'FUT'])
        
        # Select expiry based on instrument
        expiry = random.choice(instrument_expiry_map[instrument])
        
        # Select strike
        strike = random.choice(strikes)
        
        # Generate timestamp (within trading hours)
        timestamp = base_date + timedelta(
            days=random.randint(0, 20),
            hours=random.randint(9, 15),
            minutes=random.randint(0, 59),
            seconds=random.randint(0, 59)
        )
        
        # Generate price data
        if instrument == 'FUT':
            price = 24800 + random.uniform(-200, 200)
            volume = random.randint(100, 1000)
            open_interest = random.randint(1000, 10000)
        else:  # CE or PE
            price = random.uniform(50, 500)
            volume = random.randint(50, 500)
            open_interest = random.randint(500, 5000)
        
        # Generate bid/ask spread
        bid = price - random.uniform(0.5, 2)
        ask = price + random.uniform(0.5, 2)
        
        # Additional columns
        symbol = 'NIFTY'
        
        row = {
            'Timestamp': timestamp,
            'Symbol': symbol,
            'Expiry': expiry,
            'Strike': strike,
            'Instrument': instrument,
            'Price': round(price, 2),
            'Bid': round(bid, 2),
            'Ask': round(ask, 2),
            'Volume': volume,
            'OpenInterest': open_interest,
            'Change': round(random.uniform(-5, 5), 2),
            'ChangePercent': round(random.uniform(-2, 2), 2),
            'ImpliedVolatility': round(random.uniform(10, 30), 2),
            'Delta': round(random.uniform(-1, 1), 3),
            'Gamma': round(random.uniform(0, 1), 4),
            'Theta': round(random.uniform(-10, -1), 2),
            'Vega': round(random.uniform(5, 20), 2),
        }
        data.append(row)
    
    df = pd.DataFrame(data)
    
    # Sort by Timestamp
    df = df.sort_values('Timestamp')
    
    return df

def save_sample_data():
    """
    Generate and save sample data to feather file
    """
    print("Generating sample market data...")
    
    # Generate data
    df = generate_market_data(num_records=10000)
    
    # Save to feather
    output_file = 'sample_market_data.feather'
    df.to_feather(output_file)
    
    print(f"✅ Sample data saved to: {output_file}")
    print(f"📊 Total records: {len(df)}")
    print(f"📋 Columns: {list(df.columns)}")
    
    # Show summary statistics
    print("\n📈 Data Summary:")
    print(f"  - Instruments: {df['Instrument'].unique().tolist()}")
    print(f"  - Total CE contracts: {len(df[df['Instrument'] == 'CE'])}")
    print(f"  - Total PE contracts: {len(df[df['Instrument'] == 'PE'])}")
    print(f"  - Total FUT contracts: {len(df[df['Instrument'] == 'FUT'])}")
    print(f"  - Unique Expiries: {len(df['Expiry'].unique())}")
    print(f"  - Unique Strikes: {len(df['Strike'].unique())}")
    
    print(f"\n📅 Expiries by Instrument:")
    for inst in ['CE', 'PE', 'FUT']:
        expiries = df[df['Instrument'] == inst]['Expiry'].unique()
        print(f"  - {inst}: {sorted(expiries)}")
    
    return output_file

if __name__ == "__main__":
    save_sample_data()
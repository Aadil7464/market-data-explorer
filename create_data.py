import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

print("📊 Generating data...")

data = []
for i in range(8000):
    data.append({
        'Timestamp': datetime(2026,6,1) + timedelta(
            days=random.randint(0,20), 
            hours=random.randint(9,15)
        ),
        'Symbol': random.choice(['NIFTY','BANKNIFTY','FINNIFTY']),
        'Expiry': random.choice(['2026-06-26','2026-07-03','2026-07-10','2026-07-31']),
        'Strike': random.choice([24800,24900,25000,25100,25200]),
        'Instrument': random.choice(['CE','PE','FUT']),
        'Price': round(random.uniform(50,500),2),
        'Volume': random.randint(10,1000),
        'OpenInterest': random.randint(100,10000),
        'Change': round(random.uniform(-10,10),2),
        'ChangePercent': round(random.uniform(-2,2),2),
    })

df = pd.DataFrame(data)
df.to_feather('complete_mixed_data.feather')

print(f'✅ File created with {len(df)} records')
print(f'📂 File: complete_mixed_data.feather')
print(f'📊 Columns: {list(df.columns)}')
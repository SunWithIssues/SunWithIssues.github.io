import pandas as pd

path_artic_sample = "./data/sample-art-info-artic.csv"

df = pd.read_csv(path_artic_sample)

attri = df.columns.values.tolist()
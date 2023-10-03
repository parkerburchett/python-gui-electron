import sys
import pandas as pd

file_path = 'data/mock_data.csv'


def my_print(str):
    print('Python    : "' + str + '"', flush=True)  # Add flush=True here


def main():
    my_print('inside of python-gui-electron/python/pythonExample.py')
    df = pd.read_csv(file_path)
    my_print(str(df.values))


if __name__ == '__main__':
    main()
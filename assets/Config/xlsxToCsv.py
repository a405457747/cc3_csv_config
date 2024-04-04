import xlwings as xw
import os;

def write_matrix_to_csv(excel_file):
    output_csv_file = os.path.splitext(os.path.basename(excel_file))[0]+".csv";
    """
    从 Excel 中读取矩阵数据并转换为 CSV 格式，然后手动写入文件。
    
    参数:
        excel_file (str): Excel 文件路径。
        sheet_name (str): 工作表名称。
        output_csv_file (str): 输出的 CSV 文件路径。
    """
    # 打开 Excel 应用程序和工作簿
    app = xw.App(visible=False)
    wb = app.books.open(excel_file)
    
    try:
        # 选择工作表
        sheet = wb.sheets[0]
        
        # 读取矩阵数据
        matrix_data = sheet.used_range.value
        
        # 将数据写入 CSV 文件
        with open(output_csv_file, 'w') as f:
            for row in matrix_data:
                f.write(','.join(str(cell) for cell in row) + '\n')
        
        print("矩阵数据已成功转换为 CSV 文件并保存为", output_csv_file)
    
    finally:
        # 关闭工作簿和 Excel 应用程序
        wb.close()
        app.quit()

# 示例用法
excel_file = 'main.xlsx'
write_matrix_to_csv(excel_file)

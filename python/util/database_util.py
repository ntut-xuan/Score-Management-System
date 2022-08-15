import pymysql
from config import mysqlConfig

__all__ = ['Database']

class Database:

    def __connect() -> pymysql.Connection:
        conn = pymysql.connect(host=mysqlConfig["host"], user=mysqlConfig["user"], password=mysqlConfig["password"], database=mysqlConfig["database"])
        return conn

    def command_execute(command: str, param: tuple) -> dict:
        '''
        這個函數可以讓你使用 MySQL 的指令，並將回傳結果轉成一個 dict 回傳。
            param:
                command: MySQL 的指令，需要可以正常運作。
                param: 參數化的參數。
            return:
                一個包含結果的 dict。
        '''
        conn = Database.__connect()
        with conn.cursor() as cursor:
            cursor.execute(command, param)
            conn.commit()
            if cursor.description != None:
                field_name = [name[0] for name in cursor.description]
                result = cursor.fetchall()
                result_list = []
                for data in result:
                    result_list.append(dict(zip(field_name, list(data))))
                return result_list
            else:
                return {}

export const MainProvider = {

  /**
   * Заполняет таблицу инвентаризаций данными
   * @param {Number} branch_ids - список филиалов
   * @param {Date} begin_date - дата начала периода 
   * @param {Date} end_date  - дата окончания периода
   */
  get_data: (branch_ids, begin_date, end_date) => objGlobal.func_post_json({
    procName: '232_1_v1',
    procType: 'ro',
    param: {
      branch_ids,
      begin_date,
      end_date
    }
  }).then(result => result[0]),

  /**
   * Удаляет строку инвентаризации
   * @param {Number} param - Идентификатор инвентаризации
   */
  delete_inventory: param => objGlobal.func_post_json({
    procName: '232_2_v1',
    procType: 'wo',
    param
  }),
}
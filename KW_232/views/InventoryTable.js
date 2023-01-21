import { Model } from "../models/Model";

export const InventoryTable = {

  create() {
    this.models = {
      model: Model.create(),
    }
    return this
  },

  render() {
    let columns = [
      objUI.table_column_int({
        id: 'inventory_number',
        header: KW_232.lcl.inventory_table.number,
        maxWidth: 50,
      }),
      objUI.table_column({
        id: 'branch',
        header: KW_232.lcl.inventory_table.branch,
        minWidth: 280,
      }),
      objUI.table_column_datetime({
        id: 'date_start',
        header: KW_232.lcl.inventory_table.start,
        fillspace: true,
      }),
      objUI.table_column_datetime({
        id: 'date_end',
        header: KW_232.lcl.inventory_table.end,
        fillspace: true,
      }),
      objUI.table_column({
        id: 'prix_doc_number',
        header: KW_232.lcl.inventory_table.inv_p,
        minWidth: 160,
        template: item => item.prix_doc_number === null ? 'Отсутствует' : item.prix_doc_number
      }),
      objUI.table_column({
        id: 'rasx_doc_number',
        header: KW_232.lcl.inventory_table.inv_r,
        minWidth: 150,
        template: item => item.rasx_doc_number === null ? 'Отсутствует' : item.rasx_doc_number
      }),
      objUI.table_column_num({
        id: 'surplus_sum',
        header: KW_232.lcl.inventory_table.surplus_sum,
        fillspace: true
      }),
      objUI.table_column_num({
        id: 'shortage_sum',
        header: KW_232.lcl.inventory_table.shortage_sum,
        fillspace: true
      }),
      objUI.table_column_num({
        id: 'difference',
        header: KW_232.lcl.inventory_table.total_diff,
        fillspace: true
      }),
      objUI.table_column({
        id: 'status',
        header: KW_232.lcl.inventory_table.status,
        maxWidth: 100,
        template: item => this.define_status(item.status)
      }),
    ]
    return {
      id: this.id = objUtils.uid(),
      rows: [
        objUI.datatable({
          localId: 'inventory_table',
          columns,
        }),
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))

    this.elements = {
      table: this.$$('inventory_table'),
    }

    this.models.model.events.DATA_REQUESTED.subscribe(() => {
      this.elements.table.clearAll()
      objUI.show_progress(this.elements.table)
    })

    this.models.model.events.DATA_REQUEST_FINISHED.subscribe(() => {
      objUI.hide_progress(this.elements.table)
    })

    this.models.model.events.INVENTORY_REFRESHED.subscribe((inventory) => {
      this.elements.table.define_default(inventory)
      inventory.length && this.elements.table.select(this.elements.table.getFirstId())
    })

    this.models.model.events.INVENTORY_REMOVED.subscribe(() => {
      webix.message({ text: 'Инвенторизация удалена!', type: 'success', expire: 3000 })
      this.models.model.load_data()
    })

    this.models.model.events.INVENTORY_REMOVE_FAILED.subscribe(error_message => {
      webix.message({ text: `Ошибка удаления инвенторизации: ${error_message}`, type: 'error', expire: 3000 })
    })

    // Открытие по двойному клику
    this.elements.table.attachEvent('onItemDblClick', () => {
      const selected_item = KW_232.views.inventory_table.elements.table.getSelectedItem()
      objDesktop.func_script_load('KW_233', selected_item)
    })

  },

  /**
   * Формирование статуса инвентаризации из маркера
   * @param {string} flag - маркер статуса инвентаризации
   * @returns {string}
   */
  define_status(flag) {
    switch (flag) {
      case '0': return KW_232.lcl.inventory_table.started
      case '1': return KW_232.lcl.inventory_table.finished
      case '2': return KW_232.lcl.inventory_table.canceled
    }
  },
}


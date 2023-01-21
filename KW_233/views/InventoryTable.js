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
      objUI.table_column({
        id: 'tov_name',
        header: KW_233.lcl.inventory_page.tovname,
        width: 300,
        footer: { height: 25, text: `${KW_233.lcl.inventory_page.qnt_pos} 0/0` },
        cssFormat: (tovname, item) => item.ltype ? 'brak_cell' : ''
      }),
      objUI.table_column({
        id: 'fabr',
        header: KW_233.lcl.inventory_page.fabr,
        width: 200,
        cssFormat: (fabr, item) => item.ltype ? 'brak_cell' : ''
      }),
      objUI.table_column_icon({
        id: 'is_mark',
        header: 'Маркированный',
        width: 150,
        template: item => item.is_mark === '1' ? this.show_check_mark_icon() : ''
      }),
      objUI.table_column_num({
        id: 'balances_qnt',
        header: [{ text: KW_233.lcl.inventory_page.balance, colspan: 2 }, KW_233.lcl.inventory_page.qnt],
        footer: { height: 25, kw_right: true, content: 'summColumn' },
        decimal_size: 5
      }),
      objUI.table_column_num({
        id: 'balances_sum',
        header: [KW_233.lcl.inventory_page.balance, KW_233.lcl.inventory_page.sum],
        footer: { height: 25, kw_right: true, content: 'summColumn' }
      }),
      objUI.table_column_num({
        id: 'in_stock_qnt',
        header: [{ text: KW_233.lcl.inventory_page.in_stock, colspan: 2 }, KW_233.lcl.inventory_page.qnt],
        footer: { height: 25, kw_right: true, content: 'summColumn' },
        decimal_size: 5,
        cssFormat: this.add_style_to_in_stock_qnt
      }),
      objUI.table_column_num({
        id: 'in_stock_sum_bulk_nds',
        header: [KW_233.lcl.inventory_page.in_stock, KW_233.lcl.inventory_page.sum_bulk_nds],
        footer: { height: 25, kw_right: true, content: 'summColumn' }
      }),
      objUI.table_column_num({
        id: 'surplus',
        header: KW_233.lcl.inventory_page.surplus,
        footer: { height: 25, kw_right: true, content: 'summColumn' },
        decimal_size: 5,
        cssFormat: this.add_style_to_surplus_cell

      }),
      objUI.table_column_num({
        id: 'shortage',
        header: KW_233.lcl.inventory_page.shortage,
        footer: { height: 25, kw_right: true, content: 'summColumn' },
        decimal_size: 5,
        cssFormat: this.add_style_to_shortage_cell
      }),
      objUI.table_column({
        id: 'seria',
        header: KW_233.lcl.inventory_page.seria
      }),
      objUI.table_column_date({
        id: 'srok_g',
        header: KW_233.lcl.inventory_page.srok_g
      }),
      objUI.table_column({
        id: 'barcode_fabr',
        header: KW_233.lcl.inventory_page.barcode
      }),
      objUI.table_column({
        id: 'document_data_id',
        header: KW_233.lcl.inventory_page.document_data_id
      }),
      objUI.table_column({
        id: 'branch',
        header: KW_233.lcl.inventory_page.branch
      }),
      objUI.table_column_num({
        id: 'surplus_sum',
        header: KW_233.lcl.inventory_page.surplus_sum,
        footer: { height: 25, kw_right: true, content: 'summColumn' }
      }),
      objUI.table_column_num({
        id: 'shortage_sum',
        header: KW_233.lcl.inventory_page.shortage_sum,
        footer: { height: 25, kw_right: true, content: 'summColumn' }
      }),
      objUI.table_column({
        id: 'nds',
        header: KW_233.lcl.inventory_page.nds,
      })
    ]
    return {
      id: this.id = objUtils.uid(),
      rows: [
        objUI.datatable({
          localId: 'market_programs_table',
          columns,
          footer: true,
        }),
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))

    this.elements = {
      table: this.$$('market_programs_table'),
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
    })

    this.elements.table.attachEvent('onItemDblClick', () => {
      KW_233.views.history_changes_window.show(KW_233.models.main.selected_program)
    })

    this.elements.table.attachEvent('onAfterSelect', () => {
      let selected_item = this.elements.table.getSelectedItem()
      selected_item && this.models.model.set_selected_program(selected_item)
    })
  },

  show_check_mark_icon() {
    return objUI.table_column_icon_template({
      id: 'is_mark',
      text: '',
      icon: objUI.CHECK_ICON,
      css: 'pointer-events-none'
    })
  },

  add_style_to_shortage_cell(_, item) {
    if (+item.shortage > 0) {
      return 'red_bg'
    }
  },

  add_style_to_surplus_cell(_, item) {
    if (+item.surplus > 0) {
      return 'yellow_bg'
    }
  },

  add_style_to_in_stock_qnt(_, item) {
    if (+item.surplus === 0 && +item.shortage === 0 && +item.in_stock_qnt !== 0) {
      return 'green_bg'
    }
  }
}
import { HistoryChangesModel } from "../models/HistoryChangesModel";

export const HistoryChangesWindow = {

  create() {
    this.models = {
      history_changes: HistoryChangesModel.create(),
    }
    return this
  },

  render() {
    return objUI.modal_window(KW_233, {
      id: this.id = 'KW_233_modal_window',
      caption: KW_233.lcl.window_qnt.enter_qnt,
      width: 800,
      height: 400,
      resize: false,
      body: {
        rows: [
          {
            padding: { left: 8, right: 8, top: 4, bottom: 2 },
            cols: [
              {
                rows: [
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.name}:` }),
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.fabr}:` }),
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.seria}:` }),
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.srok_g}:` })
                ]
              },
              {
                rows: [
                  objUI.label({ localId: 'name' }),
                  objUI.label({ localId: 'fabr' }),
                  objUI.label({ localId: 'series' }),
                  objUI.label({ localId: 'shelf_life' })
                ]
              },
              { width: 20 },
              {
                rows: [
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.barcode_abb}:` }),
                  objUI.label_bold({ label: `${KW_233.lcl.window_qnt.accounting_amount}:` })
                ]
              },
              {
                rows: [
                  objUI.label({ localId: 'barcode' }),
                  objUI.label({ localId: 'quantity' })
                ]
              },
              {}
            ]
          },
          {
            view: 'kw_datatable',
            localId: 'table',
            editable: true,
            columns: [
              objUI.table_column({ id: 'measure', header: KW_233.lcl.window_qnt.measure, fillspace: true }),
              objUI.table_column_num({
                id: 'qnt_scan',
                header: [KW_233.lcl.window_qnt.qnt, KW_233.lcl.window_qnt.qnt_type.scan],
                fillspace: true,
                editor: 'text',
                decimal_size: 5
              }),
              objUI.table_column_num({ id: 'qnt_all', header: [KW_233.lcl.window_qnt.qnt, KW_233.lcl.window_qnt.qnt_type.all], fillspace: true, decimal_size: 5 })
            ],
            data: [
              { id: 1, measure: 'Упаковка', qnt_scan: 1, qnt_all: 0 }
            ]
          },
          {},
          {
            view: 'toolbar',
            padding: 4,
            cols: [
              objUI.checkbox({ localId: 'edit_total', width: 230, label: KW_233.lcl.window_qnt.edit_total }),
              {},
              objUI.icon_btn_ok({ localId: 'confirm', tooltip: KW_233.lcl.window_qnt.confirm }),
              objUI.icon_btn_cancel({ localId: 'cancel', tooltip: KW_233.lcl.window_qnt.cancel })
            ]
          }
        ]
      }
    })
  },

  init() {
    objUI.extend_with_local_id_out_of_module(KW_233, this, this.root = $$(this.id))

    this.elements = {
      table: this.$$('table')
    }

    this.models.history_changes.events.HISTORY_CHANGES_REQUESTED.subscribe(() => {
      objUI.show_progress(this.elements.table)
    })

    this.models.history_changes.events.HISTORY_CHANGES_REQUEST_FINISHED.subscribe(() => {
      objUI.hide_progress(this.elements.table)
    })

    this.models.history_changes.events.HISTORY_CHANGES_REFRESHED.subscribe(history_changes => {
      this.elements.table.define_default(history_changes)
    })
  },

  show(param) {
    this.root.show()
    console.log(param)
    objUI.func_update_window_head('KW_233_modal_window', `${KW_233.lcl.contextMenu.historyChanges}. ${KW_222.MARKETING_KEYS[param.type_id]}. ${param.branch}`)
    this.models.history_changes.load_history_changes(param)
  }
}
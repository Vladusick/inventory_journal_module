import { Model } from "../models/Model"

export const BottomToolbar = {

  create() {
    this.models = {
      model: Model.create()
    }
    return this
  },

  render() {
    const accordion_fill_bottom = objUI.toolbar_horizontal([
      {
        rows: [
          {
            cols: [
              {
                rows: [
                  {
                    view: 'datatable',
                    id: 'KW_420_total_balance_table',
                    height: 120,
                    spans: true,
                    columns: [
                      objUI.table_column({ id: 'balance', header: '', fillspace: true }),
                      objUI.table_column({ id: 'balance_type', header: '', fillspace: true }),
                      objUI.table_column_num({ id: 'sum', header: KW_233.lcl.total_tabbar.sum, fillspace: true }),
                      objUI.table_column({ id: 'qnt_pos', header: KW_233.lcl.total_tabbar.qnt_pos, fillspace: true })
                    ],
                    data: {
                      data: [
                        { id: 1, balance: KW_233.lcl.total_tabbar.balance, balance_type: KW_233.lcl.total_tabbar.accounting, sum: 0, qnt_pos: 0 },
                        { id: 2, balance: ``, balance_type: KW_233.lcl.total_tabbar.fact, sum: 0, qnt_pos: 0 },
                        {
                          id: 3,
                          balance: KW_233.lcl.total_tabbar.discrepancies,
                          balance_type: '',
                          sum: 0,
                          qnt_pos: '',
                          $css: 'bold_font'
                        }
                      ],
                      spans: [
                        [1, 'balance', 1, 2],
                        [3, 'balance', 2, 1, null, 'bold_font']
                      ]
                    }
                  },
                  {
                    view: 'datatable',
                    id: 'KW_420_total_discrepancies_table',
                    spans: true,
                    height: 120,
                    columns: [
                      objUI.table_column({ id: 'discrepancies', header: '', fillspace: true }),
                      objUI.table_column({ id: 'discrepancies_type', header: '', fillspace: true }),
                      objUI.table_column_num({ id: 'sum', header: KW_233.lcl.total_tabbar.sum, fillspace: true }),
                      objUI.table_column({ id: 'qnt_pos', header: KW_233.lcl.total_tabbar.qnt_pos, fillspace: true })
                    ],
                    data: {
                      data: [
                        { id: 1, discrepancies: ``, discrepancies_type: KW_233.lcl.total_tabbar.surplus, sum: 0, qnt_pos: 0 },
                        { id: 2, discrepancies: ``, discrepancies_type: KW_233.lcl.total_tabbar.shortage, sum: 0, qnt_pos: 0 },
                        {
                          id: 3,
                          discrepancies: KW_233.lcl.total_tabbar.discrepancies_sum,
                          discrepancies_type: ``,
                          sum: '',
                          qnt_pos: '',
                          $css: "bold_font"
                        }
                      ],
                      spans: [
                        [1, 'discrepancies', 1, 2],
                        [3, 'discrepancies', 2, 1, null, 'bold_font']
                      ]
                    }
                  }
                ]
              },
              {
                rows: [
                  {
                    view: 'datatable',
                    id: 'KW_420_total_docs_table',
                    columns: [
                      objUI.table_column({ id: 'doc_type', header: KW_233.lcl.total_tabbar.doc, fillspace: true }),
                      objUI.table_column({ id: 'number', header: KW_233.lcl.total_tabbar.number, fillspace: true })
                    ],
                    data: [
                      { id: 1, doc_type: KW_233.lcl.total_tabbar.inv_p, number: 0 },
                      { id: 2, doc_type: KW_233.lcl.total_tabbar.inv_r, number: 0 }
                    ]
                  }
                ]
              }
            ]
          },
          {
            view: 'toolbar',
            paddingX: 8,
            paddingY: 4,
            cols: [
              objUI.label({ label: KW_233.lcl.total_tabbar.results }),
              objUI.label_bold({ id: 'KW_420_total_results_label', label: '0,00 руб.' }),
              {},
              objUI.icon_btn_refresh({
                id: 'KW_420_total_refresh',
                tooltip: 'Обновить'
              })
            ]
          }
        ]
      }
    ])
    objUI.contextmenu(KW_233, {
      id: 'KW_420_create_popup',
      data: [
        { id: '1', value: KW_233.lcl.popup_create_inventory.full },
        { id: '2', value: KW_233.lcl.popup_create_inventory.partial }
      ]
    })
    objUI.contextmenu(KW_233, {
      id: 'KW_420_add_good_popup',
      data: [
        { id: '1', value: KW_233.lcl.add_good_popup.all_balances },
        { id: '2', value: KW_233.lcl.add_good_popup.select_goods }
      ]
    })
    return {
      id: this.id = objUtils.uid(),
      rows: [
        objUI.accordion_horizontal({
          header: 'Итоги проведения инвентаризации',
          collapsed: true,
          multi: true,
          hidden: true,
          body: accordion_fill_bottom
        }),
        objUI.toolbar_horizontal([
          objUI.search_field({
            localId: 'search_field',
            func: this.search_field_changed,
            type_search: true,
            hidden: false
          }),
          objUI.icon_btn_play({
            localId: 'KW_420_start',
            tooltip: KW_233.lcl.bottom_toolbar.start,
            popup: 'KW_420_create_popup',
            disabled: true,
          }),
          objUI.icon_btn_list({
            localId: 'KW_420_select',
            tooltip: KW_233.lcl.bottom_toolbar.select,
            popup: 'KW_420_add_good_popup',
          }),

          objUI.icon_btn_add({
            localId: 'btn_add_profile',
            tooltip: KW_233.lcl.bottom_toolbar.add,
          }),
          KW_233.tip.config(),
          {}
        ])
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))
    KW_233.tip.init()

    this.elements = {
      search_field: this.$$('search_field'),
      btn_add_profile: this.$$('btn_add_profile'),
      btn_play: this.$$('KW_420_start'),
      create_popup: $$('KW_420_create_popup'),
      add_good_popup: $$('KW_420_add_good_popup')
    }

    this.elements.search_field.attachEvent('onTimedKeyPress', () => {
      this.search_field_changed(this.elements.search_field.getValue())
    })
    this.elements.btn_add_profile.attachEvent('onItemClick', () => {
      objDesktop.func_script_load('KW_200')
    })

    this.elements.search_field.attachEvent('onTimedKeyPress', () => {
      this.search_field_changed(this.elements.search_field.getValue())
    })

    this.models.model.events.BRANCH_CHANGED.subscribe(() => {
      if (this.models.model.branch_id) {
        this.elements.btn_play.enable()
      }
    })

    this.elements.create_popup.attachEvent('onItemClick', (id) => {
      switch (id) {
        case '1':
          console.log('полная инвентаризация')
          break
        case '2':
          console.log('частичная инвентаризация')
          break
      }
    })

    this.elements.add_good_popup.attachEvent('onItemClick', (id) => {
      switch (id) {
        case '1':
          console.log('все товары на остатке')
          break
        case '2':
          console.log('выбор товаров')
          objDesktop.func_script_load('KW_412')
          break
      }
    })
  },

  search_field_changed(value) {
    KW_233.models.main.set_filter_text(value)
    KW_233.models.main.do_filtering()
  }
}
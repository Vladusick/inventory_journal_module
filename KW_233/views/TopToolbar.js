import { Model } from '../models/Model'
import { BottomToolbar } from './BottomToolbar'
export const TopToolbar = {

  create() {
    this.models = {
      model: Model.create(),
      bot: BottomToolbar.create()
    }
    return this
  },

  render() {
    const accordion_fill_top = objUI.toolbar_horizontal([
      {
        cols: [
          {
            rows: [
              {
                view: 'toolbar',
                padding: 4,
                cols: [
                  objUI.icon_btn_edit({ localId: 'select_chairman', tooltip: KW_233.lcl.commission_tabbar.edit }),
                  objUI.label_bold({ label: `${KW_233.lcl.commission_tabbar.chairman}:` }),
                  objUI.label({ localId: 'chairman', label: KW_233.lcl.commission_tabbar.not_selected, width: 120 })
                ]
              },
              objUI.table_name({ template: KW_233.lcl.commission_tabbar.members }),
              {
                view: 'kw_datatable',
                localId: 'commission_table',
                multiselect: true,
                columns: [
                  objUI.table_column_npp(),
                  objUI.table_column({ id: 'short_name', header: KW_233.lcl.commission_tabbar.short_name, fillspace: true })
                ]
              },
              {
                view: 'toolbar',
                localId: 'commission_toolbar',
                padding: 4,
                cols: [
                  objUI.icon_btn_edit({ localId: 'select_commission', tooltip: KW_233.lcl.commission_tabbar.edit })
                ]
              }
            ]
          },
          {
            rows: [
              { height: 39 },
              objUI.table_name({ template: KW_233.lcl.frp_tabbar.frp }),
              {
                view: 'kw_datatable',
                localId: 'frp_table',
                multiselect: true,
                columns: [
                  objUI.table_column_npp(),
                  objUI.table_column({ id: 'short_name', header: KW_233.lcl.frp_tabbar.short_name, fillspace: true })
                ]
              },
              {
                view: 'toolbar',
                localId: 'frp_toolbar',
                padding: 4,
                cols: [
                  objUI.icon_btn_edit({
                    localId: 'select_frp_btn',
                    tooltip: KW_233.lcl.frp_tabbar.add
                  })
                ]
              }
            ]
          },
        ]
      },
    ])
    return {
      id: this.id = objUtils.uid(),
      rows: [
        objUI.accordion_horizontal({
          localId: 'accordion_top',
          header: 'Комиссия | Материально-ответственные лица',
          collapsed: true,
          multi: true,
          body: accordion_fill_top,
          hidden: true
        }),
        objUI.toolbar_horizontal([
          objUI.combo_branches({
            localId: 'branches_combo',
            selected_all: false,
            only_one_branch: true
          }),
          objUI.label({
            localId: 'label_balances_filter',
            label: KW_233.lcl.main_tabbar.balances_filter,
            align: 'right',
            width: 130,
            hidden: true
          }),
          objUI.combo({
            localId: 'balances_filter',
            width: 200,
            value: '1',
            hidden: true,
            options: [
              { id: '1', value: KW_233.lcl.main_tabbar.balances.all },
              { id: '2', value: KW_233.lcl.main_tabbar.balances.surplus },
              { id: '3', value: KW_233.lcl.main_tabbar.balances.shortage },
              { id: '4', value: KW_233.lcl.main_tabbar.balances.all_discrepancies },
            ]
          }),
          objUI.label({
            localId: 'label_processing_filter',
            label: KW_233.lcl.main_tabbar.processing_filter,
            align: 'right',
            width: 150,
            hidden: true
          }),
          objUI.combo({
            localId: 'processing_filter',
            width: 200,
            value: '1',
            hidden: true,
            options: [
              { id: '1', value: KW_233.lcl.main_tabbar.processing.all },
              { id: '2', value: KW_233.lcl.main_tabbar.processing.processed },
              { id: '3', value: KW_233.lcl.main_tabbar.processing.not_processed },
              { id: '4', value: KW_233.lcl.main_tabbar.processing.manually_added },
            ]
          }),
          objUI.icon_btn_refresh({
            localId: 'refresh_button',
            hidden: true
          }),
          {}
        ])
      ]
    }
  },

  init() {
    objUI.extend_with_local_id_on_destination(this, this.root = $$(this.id))
    this.elements = {
      accordion_top: this.$$('accordion_top'),
      select_chairman_button: this.$$('select_chairman'),
      frp_toolbar: this.$$('frp_toolbar'),
      commission_toolbar: this.$$('commission_toolbar'),
      label_chairman: this.$$('chairman'),
      commission_table: this.$$('commission_table'),
      frp_table: this.$$('frp_table'),
      branches_combo: this.$$('branches_combo'),
      label_balances_filter: this.$$('label_balances_filter'),
      balances_filter: this.$$('balances_filter'),
      label_processing_filter: this.$$('label_processing_filter'),
      processing_filter: this.$$('processing_filter'),
      refresh_button: this.$$('refresh_button'),
    }

    this.elements.branches_combo.attachEvent('onChange', (id) => {
      this.models.model.set_branch_id(id)
    })

    this.elements.balances_filter.attachEvent('onChange', (filter_type) =>
      this.set_filter_title_ids_and_refresh_with_filter(filter_type)
    )

    this.models.model.events.DATA_REQUESTED.subscribe(() => {
      if (+this.models.model.params.status === 1) {
        this.elements.accordion_top.show(),
          this.elements.label_balances_filter.show()
        this.elements.balances_filter.show()
        this.elements.label_processing_filter.show()
        this.elements.processing_filter.show()
      }
    })

    this.elements.refresh_button.attachEvent('onItemClick', () => {
      this.models.model.load_data().then()
    })

    this.elements.select_chairman_button.attachEvent('onItemClick', () => {
      const param = {
        only_one_choice: true
      }
      objDesktop.func_script_load('KW_312', param)
    })

    this.models.model.events.DATA_REQUEST_FINISHED.subscribe(() => {
      if (+this.models.model.params.status === 1) {
        let params = this.models.model.get_params()
        this.elements.branches_combo.disable()
        this.elements.branches_combo.setValue(params.branch_id)
      }
    })

    this.models.model.events.COMMISSION_CHAIRMAN_REFRESHED.subscribe(() => {
      this.elements.label_chairman.setValue(this.models.model.commission_chairman.short_name)
    })

    this.models.model.events.COMMISSION_MEMBERS_REFRESHED.subscribe(() => {
      this.elements.commission_table.define_default(this.models.model.commission_members)
    })

    this.models.model.events.FRP_REFRESHED.subscribe(() => {
      this.elements.frp_table.define_default(this.models.model.frp)
    })
  },

  set_filter_title_ids_and_refresh_with_filter(ids) {
    KW_233.models.main.set_filter_title_ids(ids)
    KW_233.models.main.refresh_with_filter()
  }
}

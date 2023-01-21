import { Model } from './models/Model'
import { BottomToolbar } from './views/BottomToolbar'
import { InventoryTable } from './views/InventoryTable'
import { TopToolbar } from './views/TopToolbar'
import { ContextMenu } from './views/ContextMenu'


window.KW_232 = {

  locales: {
    'ru-RU': {
      header: 'Журнал инвентаризаций',
      delete_warn: 'Вы уверены, что хотите удалить выбранную инвентаризацию?',
      bottom_toolbar: {
        add: 'Добавить',
        continue: 'Продолжить/Просмотр',
        delete: 'Удалить'
      },
      price_type: 'Тип цен',
      refresh_table: 'Обновить таблицу',
      bulk_prices: 'Оптовые цены',
      retail_prices: 'Розничные цены',
      select_inventory_warn: 'Выберите инвентаризацию',
      date_range: 'Период',
      inventory_table: {
        number: 'Номер',
        branch: 'Филиал',
        start: 'Дата начала',
        end: 'Дата окончания',
        inv_p: 'Номер приходного документа',
        inv_r: 'Номер расходного документа',
        surplus_sum: 'Сумма излишка (опт.)',
        shortage_sum: 'Сумма недостачи (опт.)',
        total_diff: 'Разница итого (опт.) (+/-)',
        status: 'Статус',
        started: 'Начата',
        finished: 'Завершена',
        canceled: 'Отменена',
        no_inv_num: 'Не сформирован',
        not_finished: 'Не завершена'
      },
      finished_reason: 'Инвентаризация завершена',
      finished_warn: 'Невозможно удалить завершенную инвентаризацию'
    }
  },

  window_param: { window_maximize: true },

  render() {
    this.views = {
      top_toolbar: TopToolbar.create(),
      inventory_table: InventoryTable.create(),
      bottom_toolbar: BottomToolbar.create(),
      context_menu: ContextMenu.create()
    }

    this.views.context_menu.render()

    return {
      id: 'KW_232_body',
      rows: [
        this.views.top_toolbar.render(),
        this.views.inventory_table.render(),
        this.views.bottom_toolbar.render(),
      ]
    }
  },

  init() {
    this.models = {
      main: Model.create()
    }
    ComponentManager.init_views(Object.values(this.views))
  },

  destroy() {
    ComponentManager.destroy_views(Object.values(this.views))
  }
}
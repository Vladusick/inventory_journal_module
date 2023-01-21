import { Model } from './models/Model'
import { BottomToolbar } from './views/BottomToolbar'
import { InventoryTable } from './views/InventoryTable'
import { TopToolbar } from './views/TopToolbar'
import { HistoryChangesWindow } from './views/HistoryChangesWindow'
import { ContextMenu } from './views/ContextMenu'

window.KW_233 = {
  locales: {
    'ru-RU': {
      header: 'Журнал инвентаризаций',
      delete_warn: 'Вы уверены, что хотите удалить выбранную инвентаризацию?',
      finished_reason: 'Инвентаризация завершена',
      finished_warn: 'Невозможно удалить завершенную инвентаризацию',
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
      tabbar: {
        main: 'Общие',
        commission: 'Комиссия',
        frp: 'Материально-ответственные лица',
        total: 'Итоги'
      },
      main_tabbar: {
        inventory_type: 'Тип инвентаризации',
        type: {
          full: 'Полная',
          partial: 'Частичная'
        },
        balances_filter: 'Фильтр по остаткам',
        balances: {
          all: 'Все',
          surplus: 'Излишки',
          shortage: 'Недостача',
          all_discrepancies: 'Все расхождения'
        },
        processing_filter: 'Фильтр по обработке',
        processing: {
          all: 'Все',
          processed: 'Обработанные',
          not_processed: 'Необработанные',
          manually_added: 'Добавленные вручную'
        },
        next_sheet_filter: 'Для сл. вед-ти',
        next_sheet: {
          bulk_prices: 'Оптовые цены',
          retail_prices: 'Розничные цены'
        },
        packing_filter: 'Фильтр по фасовке',
        packing: {
          all: 'Все',
          packed: 'Фасованные'
        },
        refresh: 'Обновить'
      },
      commission_tabbar: {
        chairman: 'Председатель',
        not_selected: 'Не выбран',
        members: 'Члены комиссии',
        short_name: 'Пользователь',
        delete: 'Удалить',
        edit: 'Выбрать',
        error_qnt: 'Ошибка при записи членов комиссии. Выбрано некорректное количество пользователей.',
        error_max_qnt: 'Максимальное количество членов комиссии - 3',
        error_not_selected: 'Не выбран ни один член комиссии'
      },
      frp_tabbar: {
        frp: 'Материально-ответственные лица',
        short_name: 'Пользователь',
        add: 'Добавить',
        delete: 'Удалить',
        error_not_selected: 'Не выбрано ни одно материально-ответственное лицо'
      },
      total_tabbar: {
        total: 'Итоги проведения инвентаризации',
        balance: 'Остаток',
        accounting: 'Учетный',
        fact: 'Фактический',
        discrepancies: 'Расхождение остатка = Фактический - Учетный',
        sum: 'Сумма (руб.)',
        qnt_pos: 'Кол-во позиций',
        discrepancies_sum: 'Состав расхождения сумма',
        surplus: 'Излишки (+)',
        shortage: 'Недостача (-)',
        doc: 'Документ',
        number: 'Номер',
        inv_p: 'Инвентаризация (Приход)',
        inv_r: 'Инвентаризация (Расход)',
        refresh: 'Обновить',
        results: 'По результатам инвентаризации фактический остаток аптеки составляет:'
      },
      inventory_page: {
        table_name: 'Список товаров',
        tovname: 'Наименование',
        fabr: 'Производитель',
        balance: 'Остаток',
        qnt: 'Кол-во',
        qnt_packing: 'Кол-во фасовка',
        sum: 'Сумма',
        in_stock: 'В наличии',
        multiplicity: 'Кратность',
        sum_retail: 'Сумма розн.',
        sum_bulk_nds: 'Сумма опт. с НДС',
        surplus: 'Излишки',
        shortage: 'Недостача',
        seria: 'Серия',
        srok_g: 'Срок годности',
        barcode: 'Штрихкод производителя',
        sum_retail_nds: 'Цена розн. с НДС',
        document_data_id: '№ партии',
        branch: 'Филиал',
        surplus_sum: 'Сумма излишков',
        shortage_sum: 'Сумма недостачи',
        nds: 'Ставка НДС',
        previous_barcode: 'Штрихкод предыдущей программы',
        qnt_pos: 'Кол-во: партий/позиций:'
      },
      window_qnt: {
        enter_qnt: 'Введите количество',
        name: 'Наименование',
        fabr: 'Производитель',
        seria: 'Серия',
        srok_g: 'Срок годности',
        barcode_abb: 'ШК',
        accounting_amount: 'Учетное количество',
        measure: 'Единица измерения',
        packing: 'Фасовка',
        qnt: 'Количество',
        qnt_type: {
          scan: 'Найдено',
          all: 'Всего'
        },
        edit_total: 'Редактировать общее количество',
        confirm: 'Подтверждение',
        cancel: 'Отмена'
      },
      window_edit: {
        edit_good: 'Редактирование товара',
        name: 'Наименование',
        fabr: 'Производитель',
        reestr_price: 'Цена реестра',
        in_stock_qnt: 'Количество',
        srok_g: 'Срок годности',
        seria: 'Серия',
        barcode_fabr: 'Штрихкод',
        nds: 'Ставка НДС',
        certif: 'Сертификат',
        certif_date_begin: 'Дата начала сертификата',
        certif_date_end: 'Дата окончания сертификата',
        price_fabr_no_nds: 'Цена произв-ая без НДС',
        price_opt_w_nds: 'Цена оптовая с НДС',
        gtd_number: 'ГТД',
        reg_number: 'Рег. №',
        save: 'Сохранить'
      },
      barcode_window: {
        title: 'Введите штрихкод',
        barcode: 'Штрихкод',
        confirm: 'Подтвердить',
        cancel: 'Отменить',
        not_found_warn: 'Товар с введенным штрихкодом не найден',
        tooltip: 'От 12 до 13 символов, только цифры'
      },
      add_good_popup: {
        all_balances: 'Все товары на остатке',
        select_goods: 'Выбор товаров'
      },
      bottom_toolbar: {
        start: 'Начать',
        select: 'Выбор товаров',
        clear: 'Очистить',
        add: 'Добавить товар',
        delete: 'Удалить товар',
        not_finished_reason: 'Есть незавершенная инвентаризация',
        not_finished_warn: 'На выбранном филиале уже есть начатая инвентаризация'
      },
      finishing: {
        tooltip: 'Завершить инвентаризацию',
        title: 'Завершение инвентаризации',
        warning: `Данное действие приведет к созданию приходных и расходных документов
         на основании излишков и недостачи. Отменить завершение инвентаризации и продолжить
          ее будет невозможно. Вы уверены?`,
        success: 'Инвентаризация успешно завершена',
        failed: 'Невозможно завершить инвентаризацию. ',
        one_reason: 'Причина: ',
        few_reasons: 'Причины: ',
        reasons: {
          chairman: 'не выбран председатель комиссии',
          commission: 'не выбраны члены комиссии',
          frp: 'не выбраны материально-ответственные лица',
          finished: 'данная инвентаризация уже завершена',
          canceled: 'данная инвентаризация отменена'
        }
      },
      check_status: {
        finished: 'Данная инвентаризация уже завершена',
        canceled: 'Данная инвентаризация отменена'
      },
      context_menu: {
        edit: 'Редактирование товара'
      },
      popup_create_inventory: {
        full: 'Полная инвентаризация',
        partial: 'Частичная инвентаризация'
      },
      good_deleting: {
        title: 'Удаление товара',
        text_begin: 'Вы уверены, что хотите удалить товар ',
        text_end: ' из инвентаризации?'
      }
    }
  },

  func_create_main_menu() {
    objWindow.func_add_main_menu(KW_233.win, [{
      icon: objUI.FORWARD_ICON,
      id: 'KW_420_finish',
      value: KW_233.lcl.finishing.tooltip
    }]);
  },

  func_main_menu_on_item_click(menu_id) {
    if (menu_id === 'KW_420_finish') {
      objUI.modalbox({
        title: KW_233.lcl.finishing.title,
        text: KW_233.lcl.finishing.warning,
        buttons: ['ok', 'cancel'],
        width: 400,
        callback: console.log('ok')
      });
    }
  },

  window_param: { window_maximize: true },

  render() {
    this.views = {
      top_toolbar: TopToolbar.create(),
      inventory_table: InventoryTable.create(),
      bottom_toolbar: BottomToolbar.create(),
      history_changes_window: HistoryChangesWindow.create(),
      context_menu: ContextMenu.create()
    }

    this.views.history_changes_window.render()
    this.views.context_menu.render()

    return {
      id: 'KW_233_body',
      rows: [
        this.views.top_toolbar.render(),
        this.views.inventory_table.render(),
        this.views.bottom_toolbar.render(),
      ]
    }
  },

  init(params) {
    this.models = {
      main: Model.create()
    }

    ComponentManager.init_views(Object.values(this.views))

    this.models.main.set_params(params)

    if (Object.entries(this.models.main.params).length !== 0) {
      this.models.main.load_data()
      this.models.main.load_commission_chairman()
      this.models.main.load_commission_members()
      this.models.main.load_frp()
    }
    this.tip.init()
  },

  destroy() {
    ComponentManager.destroy_views(Object.values(this.views))
  },

  tip: objUI.components.tip({

    options: [
      {
        in: () => !KW_420.model.inventory.branch_id,
        out: 'Выберите филиал',
        css: 'color-blue-400-webix'
      },
      {
        in: () => !KW_420.model.inventory.inventory_title_id,
        out: 'Запустите инвентаризацию',
        css: 'color-blue-400-webix'
      },
      {
        in: () => KW_420.model.is_editable_inventory() && !KW_420.model.commission_chairman.person_id,
        out: 'Определите председателя комиссии',
        css: 'color-red-400-webix'
      },
      {
        in: () => KW_420.model.is_editable_inventory() && !KW_420.model.commission_members.length,
        out: 'Определите состав комиссии',
        css: 'color-red-400-webix'
      },
      {
        in: () => KW_420.model.is_editable_inventory() && !KW_420.model.frp.length,
        out: 'Определите состав материально-ответственных лиц',
        css: 'color-red-400-webix'
      }
    ]
  }),
}
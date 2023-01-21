export const HistoryChangesModel = {

  create: function () {
    return this
  },

  events: {
    HISTORY_CHANGES_REQUESTED: new ApplicationEvent(),
    HISTORY_CHANGES_REFRESHED: new ApplicationEvent(),
    HISTORY_CHANGES_REFRESH_FAILED: new ApplicationEvent(),
    HISTORY_CHANGES_REQUEST_FINISHED: new ApplicationEvent(),
  },

  history_changes: [],

  async load_history_changes(param) {
    this.events.HISTORY_CHANGES_REQUESTED.notify()
    try {
      this.history_changes = await MainProvider.get_history_changes(param)
      this.events.HISTORY_CHANGES_REFRESHED.notify(this.history_changes)
    } catch (e) {
      this.events.HISTORY_CHANGES_REFRESH_FAILED.notify(e)
    } finally {
      this.events.HISTORY_CHANGES_REQUEST_FINISHED.notify()
    }
  }
}
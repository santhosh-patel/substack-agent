import PG from './pg.js';

PG.isConnected = false;
PG.allHistoryItems = [];
PG.commentAutomationAbortController = null;
PG.schedulerPollingInterval = null;
PG.apiKeySaveTimer = null;
PG.currentProfile = null;

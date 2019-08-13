import ExplorerService from './services/Explorer';

const state = {
    explorerUpdateTimer: undefined,
    explorerLoading: false,
    explorerService: undefined,
    explorerError: '',
    explorerInfo: {}
};

state.explorerService = new ExplorerService();
export default state;

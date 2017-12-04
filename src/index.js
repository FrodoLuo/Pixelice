import dva from 'dva';
import { createBrowserHistory } from 'history';
import './index.less';

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/auth'));

app.model(require('./models/album'));

app.model(require('./models/user'));

app.model(require('./models/photo'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

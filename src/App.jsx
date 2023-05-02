import Timer from './components/Timer';
import { Counter } from './components/Counter';
import { useState } from 'react';

const App = () => {
  const [timeout, setTimeout] = useState(300);
  const [session, setSession] = useState(1500);
  const [refresh, setRefresh] = useState(false);

  const [activeTimer, setActiveTimer] = useState(false);
  
  const refreshTimer = () => {
    setTimeout(300);
    setSession(1500);
    setRefresh(true);
  }

  return (
    <div className="container p-2 bg-app h-100 border border-dark border-5 rounded position-fixed top-50 start-50 translate-middle">
      <h5 className='row mb-3 mt-3'>
        <h1 className='container border-light border-5 border bg-dark rounded w-50 text-center mt-5 mb-5 text-light display-1'>25 + 5 Clock</h1>
      </h5>
      <div className='row mb-3 mt-5 p-3'>
        <div className='col-6'><Counter refreshCounter={refresh} title='Break Length' countId="break" isActive={activeTimer} textcolor={'warning'} countMax={1800} countMin={60} countChange={60} passCount={setTimeout} initialCount={timeout} /></div>
        <div className='col-6'><Counter refreshCounter={refresh} title='Session Length' countId="session" isActive={activeTimer} textcolor={'info'} countMax={1800} countMin={60} countChange={60} passCount={setSession} initialCount={session} /></div>
      </div>
      <div className='row mb-3 mt-3 justify-content-center d-flex'>
        <div className='col-auto'><Timer setRefresh={refreshTimer} activeTimer={setActiveTimer} timer={session} timeout={timeout} /></div>
      </div>
    </div>
  );
}

export default App;

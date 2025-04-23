import './App.css';
import { Routes, Route } from 'react-router-dom';

import Link from '@mui/material/Link';
import { Stack } from '@mui/material';

// import { RouterLink } from 'src/routes/components';
import { RouterLink } from '/src/components/router-link';

import LogoBTC from './assets/logo-btc.svg';
import LogoPepe from './assets/logo-pepe.svg';
import PageViewFundraiser from './fundraising';
import PageReceipts from './fundraising/Receipts';
import PageCreateFundraiser from './fundraising/CreateFundraiser';
// import SustainableMemeLab1 from './assets/SustainableMemeLab1.png'
// import SustainableMemeLab2 from './assets/SustainableMemeLab2.png'

function App() {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <a>
          <img src={LogoBTC} className="logo" alt="Bitcoin logo" />
        </a>
        <a>
          <img src={LogoPepe} className="logo react" alt="Pepe logo" />
        </a>
        {/* <h1>Fundraising</h1> */}
      </div>

      <div>
        {/* <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Link component={RouterLink} href="/dashboard/fundraising">Main</Link>
          <Link component={RouterLink} href="/dashboard/fundraising/view-fundraiser">View</Link>
          <Link component={RouterLink} href="/dashboard/fundraising/create-fundraiser">Create</Link>
        </Stack> */}

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Link component={RouterLink} href="/">View</Link>
          <Link component={RouterLink} href="/fundraising/create-fundraiser">Create</Link>
        </Stack>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<PageViewFundraiser />} />
          <Route path="/fundraising/create-fundraiser" element={<PageCreateFundraiser />} />
          <Route path="/fundraising/receipts" element={<PageReceipts />} />
        </Routes>

        {/* <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <img src={SustainableMemeLab1} className="logo" style={{ height: '350px' }} alt="SustainableMemeLab1" />
          <img src={SustainableMemeLab2} className="logo" style={{ height: '350px' }} alt="SustainableMemeLab2" />
        </Stack> */}
      </div>
    </>
  );
}

export default App;

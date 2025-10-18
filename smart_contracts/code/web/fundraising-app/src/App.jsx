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
// import SustainableSystemsLab1 from './assets/sustainable-systems-lab-1.png'
// import SustainableSystemsLab2 from './assets/sustainable-systems-lab-2.png'

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
          <img src={SustainableSystemsLab1} className="logo" alt="Sustainable Systems Lab 1" style={{ height: '350px' }} />
          <img src={SustainableSystemsLab2} className="logo" alt="Sustainable Systems Lab 2" style={{ height: '350px' }} />
        </Stack> */}
      </div>
    </>
  );
}

export default App;

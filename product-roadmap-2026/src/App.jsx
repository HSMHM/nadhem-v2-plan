import MainLayout from './components/layout/MainLayout';
import S01_HeroDashboard from './components/sections/S01_HeroDashboard';
import S02_Committees from './components/sections/S02_Committees';
import S03_UserTypes from './components/sections/S03_UserTypes';
import S04_TopFeatures from './components/sections/S04_TopFeatures';
import S05_Satisfaction from './components/sections/S05_Satisfaction';
import S06_Market from './components/sections/S06_Market';
import S07_Challenges from './components/sections/S07_Challenges';
import S08_Developments from './components/sections/S08_Developments';
import S09_Modules from './components/sections/S09_Modules';
import S10_Packages from './components/sections/S10_Packages';
import S11_Integrations from './components/sections/S11_Integrations';
import S12_Timeline from './components/sections/S12_Timeline';
import S13_Contact from './components/sections/S13_Contact';

function App() {
  return (
    <MainLayout>
      <S01_HeroDashboard />
      <S02_Committees />
      <S03_UserTypes />
      <S04_TopFeatures />
      <S05_Satisfaction />
      <S06_Market />
      <S07_Challenges />
      <S08_Developments />
      <S09_Modules />
      <S10_Packages />
      <S11_Integrations />
      <S12_Timeline />
      <S13_Contact />
    </MainLayout>
  );
}

export default App;

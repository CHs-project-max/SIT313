import HeaderImg from './HeaderImg';
import './App.css';
import Search from './Search';
import Headertxt from './headertxt';
import FeatureArticle from './FeatureArticles'
import Button from './Button'
import FeatureTutorials from './FeatureTutorials';
import Subscribe from './Subscribe';
import Info from './info';
function App() {
  return (
    <div>
      <Search />
      <HeaderImg />
      <Headertxt text = "Feature Articles" />
      <FeatureArticle/>
      <Button text = "See all articles" />
      <Headertxt text = "Feature Tutorials"/>
      <FeatureTutorials />
      <Button text = "See all tutorials" />
      <Subscribe />
      <Info />
    </div>
  );
}

export default App;

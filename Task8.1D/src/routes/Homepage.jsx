import HeaderImg from '../HeaderImg';
import Search from '../Search';
import Headertxt from '../headertxt';
import FeatureArticle from '../FeatureArticles'
import Button from '../Button'
import FeatureTutorials from '../FeatureTutorials';
import Subscribe from '../Subscribe';
import Info from '../info';

export default function Homepage()
{
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
import { selectAlltextsList } from '../../../redux/slices/textsSlice';
import { useSelector } from 'react-redux';

function DashboardText() {
  const { textsList } = useSelector(selectAlltextsList);
  return (
    <div className="flex flex-col justify-center items-center gap-16 mt-32">
      <h1 className="flex text-2xl text-emerald-700 font-bold">
        {textsList.dashboardTitle}
      </h1>
      <p className="text-center text-lg">
        <span>{textsList.dashboardText1}</span> <br />{' '}
        <span>{textsList.dashboardText2}</span>
      </p>
    </div>
  );
}

export default DashboardText;

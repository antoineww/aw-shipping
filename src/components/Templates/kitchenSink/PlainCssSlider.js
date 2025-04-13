
import Slider from '@mui/material/Slider';
// import './PlainCssSlider.css';

export default function PlainCssSlider() {
    return (
      <div>
        <Slider defaultValue={30} />
        <Slider defaultValue={30} className="slider" />
      </div>
    );
  }
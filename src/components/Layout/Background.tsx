import classes from './Background.module.css';

const Background = () => (
  <>
    <div className={classes.box}>
      <div className={classes.wave} />
      <div className={classes.wave} />
      <div className={classes.wave} />
    </div>
    <div className="slider-thumb" />
  </>
);

export default Background;

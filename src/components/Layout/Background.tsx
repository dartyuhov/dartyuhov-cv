import classes from './Background.module.css';

const Background = () => (
  <div aria-label="background" className={classes.box}>
    <div className={classes.wave} />
    <div className={classes.wave} />
    <div className={classes.wave} />
  </div>
);

export default Background;

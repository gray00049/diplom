import bannerImg from '../assets/banner.jpg';

export default function Banner() {
  return (
    <div className="banner">
      <img src={bannerImg} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}

import { useContext, useRef, useEffect } from "react";

import Img from "../_common/Img";

import { HelperContext } from "../../context/helper";

const Component = (props) => {
  const _helper = useContext(HelperContext);

  const _block = useRef(null);
  const _pic = useRef(null);

  useEffect(() => {
    if (_helper.isMobile) {
      return;
    }
    if (!_block || !_block.current) {
      return;
    }

    const step = 80;
    const topBoundary = _block.current.offsetTop - step;
    const bottomBoundary =
      _block.current.offsetHeight + _block.current.offsetTop;

    const onScroll = () => {
      if (!_block || !_block.current) {
        return;
      }

      // reset position when block isn't visible
      if (topBoundary > window.pageYOffset) {
        return (_pic.current.style.marginTop = `${step / 2}px`);
      } else if (bottomBoundary < window.pageYOffset) {
        return (_pic.current.style.marginTop = `-${step / 2}px`);
      }

      const diff = _block.current.offsetTop - window.pageYOffset;

      if (Math.abs(diff) > step) {
        return;
      }

      _pic.current.style.marginTop = `${diff / 2}px`;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [_helper, _block]);

  const imgSide = (
    <div className="img-side">
      {!!props.img && <Img ref={_pic} useWebp src={props.img} />}
    </div>
  );

  return (
    <div ref={_block} className="floating-block">
      {!props.rightSideOriented ? imgSide : null}
      <div className="text-side">{props.children}</div>
      {props.rightSideOriented ? imgSide : null}
    </div>
  );
};

export default Component;

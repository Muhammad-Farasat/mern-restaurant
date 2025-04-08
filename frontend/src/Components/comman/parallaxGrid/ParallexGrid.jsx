import React, { useRef } from 'react';
import { useScroll, useSpring, animated } from '@react-spring/web';

const ParallaxGrid = ({ children, speed = 0.3 }) => {

    const ref = useRef();

    const { scrollYProgress } = useScroll({

        target: ref,
        offset: ["start end", "end start"],

    });

    const y = useSpring({

        to: scrollYProgress.to((v) => v * speed * 100),
        config: { mass: 1, tension: 120, friction: 20 },

    });

    return (

        <animated.div ref={ref} style={{ y }}>

            {children}

        </animated.div>

    );
};

export default ParallaxGrid;

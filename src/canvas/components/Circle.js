import { useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";


export const Circles = () => {
    const data = useMainStore((state) => state.data);
    const currentItem = useMainStore((state) => state.currentItem);

    const urls = data.map((track) => track.cover);
    const textures = useTexture([...urls]);

    return urls.map((url, i) => (
        <motion.mesh scale={i === currentItem ? 1 : 0}
        animate={{
            scale: i === currentItem ? 1 : 0,
            transition: { duratiom: 0.35 }
        }}
        position={[0, 1, 0]}
        rotation={[0, Math.PI / 4, 0]}
        key={`circles${i}`}
        >
            <circleGeometry args={[0.7, 12]}/>
            <meshStandardMaterial map= {textures[i]}/>\
        </motion.mesh>
    ));
    
};
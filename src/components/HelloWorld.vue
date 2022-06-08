<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeBSP = require("three-js-csg")(Three);

export default {
  data: function () {
    return {
      scene: null,
      baseCylinder: null,
    };
  },
  methods: {
    // eslint-disable-next-line prettier/prettier
    createCylinder: function (radiusTop = 1, radiusButtom = 1, height = 1, segments = 32) {
      // console.log("createCylinder");
      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusButtom, height, segments);
      this.baseCylinder = new Three.Mesh(
        cylinder,
        // eslint-disable-next-line prettier/prettier
        new Three.MeshLambertMaterial({ color: 0x808080, side: Three.DoubleSide })
      );
      this.scene.add(this.baseCylinder);
    },

    // eslint-disable-next-line prettier/prettier
    modifyCylinder: function (radiusTop = 1, radiusButtom = 1, height = 1, segments = 32) {
      // console.log("modifyCylinder");
      // eslint-disable-next-line prettier/prettier
      this.scene.remove(this.baseCylinder);
      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusButtom, height, segments);
      this.baseCylinder = new Three.Mesh(
        cylinder,
        // eslint-disable-next-line prettier/prettier
        new Three.MeshLambertMaterial({ color: 0x808080, side: Three.DoubleSide })
      );
      this.scene.add(this.baseCylinder);
    },

    // eslint-disable-next-line prettier/prettier
    createCutHole: function (radius = 1, height = 1, posx = 0, posy = 0, posz = 0, segments = 32) {
      // console.log("createCutHoleCylinder");
      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radius, radius, height, segments);
      var cylinderMesh = new Three.Mesh(
        cylinder,
        // eslint-disable-next-line prettier/prettier
        new Three.MeshLambertMaterial({ color: 0xff0000 })
      );
      cylinderMesh.position.set(posx, posy, posz);
      this.scene.add(cylinderMesh);
      this.scene.remove(this.baseCylinder);
      this.scene.remove(cylinderMesh);

      try {
        var baseCylinderBSP = new ThreeBSP(this.baseCylinder);
        var cylinderBSP = new ThreeBSP(cylinderMesh);
        var resultBSP = baseCylinderBSP.subtract(cylinderBSP);
        this.baseCylinder = resultBSP.toMesh();
        this.baseCylinder.geometry.computeFaceNormals();
        this.baseCylinder.geometry.computeVertexNormals();
        var material = new Three.MeshLambertMaterial({
          color: 0x0000ff,
          side: Three.DoubleSide,
        });
        this.baseCylinder.material = material;
        this.scene.add(this.baseCylinder);
      } catch (e) {
        return;
      }
    },

    // eslint-disable-next-line prettier/prettier
    createMergedNeck: function (radiusButtom = 1, radiusTop = 1, height = 1, posx = 0, posy = 0, posz = 0, segments = 32) {
      // console.log("createMergedNeck");

      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusButtom, height, segments);
      var cylinderMesh = new Three.Mesh(
        cylinder,
        // eslint-disable-next-line prettier/prettier
        new Three.MeshLambertMaterial({ color: 0xff0000 })
      );
      cylinderMesh.position.set(posx, posy, posz);
      this.scene.add(cylinderMesh);
      this.scene.remove(this.baseCylinder);
      this.scene.remove(cylinderMesh);

      try {
        var baseCylinderBSP = new ThreeBSP(this.baseCylinder);
        var cylinderBSP = new ThreeBSP(cylinderMesh);
        var resultBSP = baseCylinderBSP.union(cylinderBSP);
        this.baseCylinder = resultBSP.toMesh();
        this.baseCylinder.geometry.computeFaceNormals();
        this.baseCylinder.geometry.computeVertexNormals();
        var material = new Three.MeshLambertMaterial({
          color: 0x0000ff,
          side: Three.DoubleSide,
        });
        this.baseCylinder.material = material;
        this.scene.add(this.baseCylinder);
      } catch (e) {
        return;
      }
    },

    cameraSet: function (x, y, z) {
      this.scene.camera.position.set(x, y, z);
    },
  },
  mounted: function () {
    const scene = new Three.Scene();
    scene.background = new Three.Color("#eee");
    const canvas = document.querySelector("#three");
    const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
    const camera = new Three.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.background = new Three.Color("#eee");
    //在代码上面声明场景等下面加这句:
    scene.fog = new Three.Fog("#eee", 20, 100);
    renderer.shadowMap.enabled = true;
    controls.enableDamping = false;

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      var width = window.innerWidth;
      var height = window.innerHeight;
      var canvasPixelWidth = canvas.width / window.devicePixelRatio;
      var canvasPixelHeight = canvas.height / window.devicePixelRatio;

      const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
    }

    animate();

    const dirLight = new Three.DirectionalLight(0xffffff, 1);
    //光源等位置
    dirLight.position.set(-10, 10, -10);
    //可以产生阴影
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new Three.Vector2(1024, 1024);
    scene.add(dirLight);

    const hemLight = new Three.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemLight.position.set(0, 48, 0);
    scene.add(hemLight);

    this.scene = scene;
  },
};
</script>

<style>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>

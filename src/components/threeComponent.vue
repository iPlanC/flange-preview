<template>
  <div>
    <div id="front"><canvas id="front_view"></canvas><b>正视图</b></div>
    <div id="side"><canvas id="side_view"></canvas><b>侧视图</b></div>
    <div id="overlook"><canvas id="overlook_view"></canvas><b>俯视图</b></div>
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
    createCylinder: function (radiusTop = 1, radiusbottom = 1, height = 1, segments = 32) {
      // console.log("createCylinder");
      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusbottom, height, segments);
      this.baseCylinder = new Three.Mesh(
        cylinder,
        // eslint-disable-next-line prettier/prettier
        new Three.MeshLambertMaterial({ color: 0x808080, side: Three.DoubleSide })
      );
      this.scene.add(this.baseCylinder);
    },

    // eslint-disable-next-line prettier/prettier
    modifyCylinder: function (radiusTop = 1, radiusbottom = 1, height = 1, segments = 32) {
      // console.log("modifyCylinder");
      // eslint-disable-next-line prettier/prettier
      this.scene.remove(this.baseCylinder);
      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusbottom, height, segments);
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
        new Three.MeshLambertMaterial({ color: 0x808080 })
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
          color: 0x808080,
          side: Three.DoubleSide,
        });
        this.baseCylinder.material = material;
        this.scene.add(this.baseCylinder);
      } catch (e) {
        return;
      }
    },

    // eslint-disable-next-line prettier/prettier
    createMergedNeck: function (radiusbottom = 1, radiusTop = 1, height = 1, posx = 0, posy = 0, posz = 0, segments = 32) {
      // console.log("createMergedNeck");

      // eslint-disable-next-line prettier/prettier
      var cylinder = new Three.CylinderGeometry(radiusTop, radiusbottom, height, segments);
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
        this.baseCylinder.castShadow = true;
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
    const front_view = document.querySelector("#front_view");
    const side_view = document.querySelector("#side_view");
    const overlook_view = document.querySelector("#overlook_view");

    const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
    // eslint-disable-next-line prettier/prettier
    const front_view_renderer = new Three.WebGLRenderer({ canvas:front_view, antialias: true });
    // eslint-disable-next-line prettier/prettier
    const side_view_renderer = new Three.WebGLRenderer({ canvas:side_view, antialias: true });
    // eslint-disable-next-line prettier/prettier
    const overlook_view_renderer = new Three.WebGLRenderer({ canvas:overlook_view, antialias: true });
    // eslint-disable-next-line prettier/prettier
    const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    // eslint-disable-next-line prettier/prettier
    const front_view_camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    // eslint-disable-next-line prettier/prettier
    const side_view_camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    // eslint-disable-next-line prettier/prettier
    const overlook_view_camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    front_view_camera.position.set(0, 0, 10);
    side_view_camera.position.set(10, 0, 0);
    overlook_view_camera.position.set(0, 10, 0);
    front_view_camera.lookAt(0, 0, 0);
    side_view_camera.lookAt(0, 0, 0);
    overlook_view_camera.lookAt(0, 0, 0);
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
      front_view_renderer.render(scene, front_view_camera);
      side_view_renderer.render(scene, side_view_camera);
      overlook_view_renderer.render(scene, overlook_view_camera);
      requestAnimationFrame(animate);
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      if (resizeRendererToDisplaySize(front_view_renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      if (resizeRendererToDisplaySize(side_view_renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      if (resizeRendererToDisplaySize(overlook_view_renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
    }

    animate();

    const spotLight = new Three.SpotLight(0xffffff, 0.6);
    spotLight.position.set(0, 20, 0);
    scene.add(spotLight);
    const spotLight2 = new Three.SpotLight(0xffffff, 0.6);
    spotLight2.position.set(0, -20, 0);
    scene.add(spotLight2);

    const hemLight = new Three.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemLight.position.set(0, 50, 0);
    scene.add(hemLight);

    this.scene = scene;
  },
};
</script>

<style>
canvas {
  box-sizing: border-box;
  border: 0.5px solid #000;
}

#three {
  width: 50%;
  height: 50%;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
}

#front {
  width: 50%;
  height: 50%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
#front b {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
}
#front_view {
  width: 50%;
  height: 50%;
  position: fixed;
  left: 0;
  top: 0;
}
#side {
  width: 50%;
  height: 50%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
}
#side b {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 5px;
}
#side_view {
  width: 50%;
  height: 50%;
  position: fixed;
  right: 0;
  top: 0;
}

#overlook {
  width: 50%;
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: -1;
}
#overlook b {
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
}
#overlook_view {
  width: 50%;
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>

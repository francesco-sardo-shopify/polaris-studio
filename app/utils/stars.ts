const getStars = () => {
  const num = 200;
  let w = window.innerWidth;
  let h = window.innerHeight;
  const _x = 0;
  const _y = 0;
  const _z = 150;

  const dtr = (d: number) => (d * Math.PI) / 180;

  const rnd = function () {
    return Math.sin((Math.floor(Math.random() * 360) * Math.PI) / 180);
  };

  const cam = {
    obj: { x: _x, y: _y, z: _z },
    dest: { x: 0, y: 0, z: 1 },
    dist: { x: 0, y: 0, z: 200 },
    ang: { cplane: 0, splane: 0, ctheta: 0, stheta: 0 },
    zoom: 1,
    disp: { x: w / 2, y: h / 2, z: 0 },
    upd() {
      cam.dist.x = cam.dest.x - cam.obj.x;
      cam.dist.y = cam.dest.y - cam.obj.y;
      cam.dist.z = cam.dest.z - cam.obj.z;
      cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.ctheta =
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
      cam.ang.stheta =
        -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
    },
  };

  const trans = {
    parts: {
      sz(p: { x: number; y: number; z: number }, sz: { x: number; y: number; z: number }) {
        return {
          x: p.x * sz.x,
          y: p.y * sz.y,
          z: p.z * sz.z,
        };
      },
      rot: {
        x(p: { x: number; y: number; z: number }, rot: { x: number; y: number; z: number }) {
          return {
            x: p.x,
            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x)),
          };
        },
        y(p: { x: number; y: number; z: number }, rot: { x: number; y: number; z: number }) {
          return {
            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
            y: p.y,
            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y)),
          };
        },
        z(p: { x: number; y: number; z: number }, rot: { x: number; y: number; z: number }) {
          return {
            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
            z: p.z,
          };
        },
      },
      pos(p: { x: number; y: number; z: number }, pos: { x: number; y: number; z: number }) {
        return {
          x: p.x + pos.x,
          y: p.y + pos.y,
          z: p.z + pos.z,
        };
      },
    },
    pov: {
      plane(p: { x: number; y: number; z: number }) {
        return {
          x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
          y: p.y,
          z: p.x * -cam.ang.splane + p.z * cam.ang.cplane,
        };
      },
      theta(p: { x: number; y: number; z: number }) {
        return {
          x: p.x,
          y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
          z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta,
        };
      },
      set(p: { x: number; y: number; z: number }) {
        return {
          x: p.x - cam.obj.x,
          y: p.y - cam.obj.y,
          z: p.z - cam.obj.z,
        };
      },
    },
    persp(p: { x: number; y: number; z: number }) {
      return {
        x: ((p.x * cam.dist.z) / p.z) * cam.zoom,
        y: ((p.y * cam.dist.z) / p.z) * cam.zoom,
        z: p.z * cam.zoom,
        p: cam.dist.z / p.z,
      };
    },
    disp(p: { x: number; y: number; z: number; p: number }, disp: { x: number; y: number; z: number }) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p,
      };
    },
    steps(
      obj: { x: number; y: number; z: number; p: number },
      sz: { x: number; y: number; z: number },
      rot: { x: number; y: number; z: number },
      pos: { x: number; y: number; z: number },
      disp: { x: number; y: number; z: number },
    ) {
      let _args = trans.parts.sz(obj, sz);
      _args = trans.parts.rot.x(_args, rot);
      _args = trans.parts.rot.y(_args, rot);
      _args = trans.parts.rot.z(_args, rot);
      _args = trans.parts.pos(_args, pos);
      _args = trans.pov.plane(_args);
      _args = trans.pov.theta(_args);
      _args = trans.pov.set(_args);
      _args = trans.persp(_args);
      _args = trans.disp(_args, disp);

      return _args;
    },
  };

  const run = () => {
    const threeD = function (param: {
      vtx: { x: number; y: number; z: number };
      sz: { x: number; y: number; z: number };
      rot: { x: number; y: number; z: number };
      pos: { x: number; y: number; z: number };
    }) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = param.vtx;
      this.transIn.sz = param.sz;
      this.transIn.rot = param.rot;
      this.transIn.pos = param.pos;
    };

    threeD.prototype.vupd = function () {
      this.transOut = trans.steps(this.transIn.vtx, this.transIn.sz, this.transIn.rot, this.transIn.pos, cam.disp);
    };

    const Build = function () {
      this.vel = 0.000000001;
      this.lim = 360;
      this.diff = 200;
      this.initPos = 100;
      this.toX = _x;
      this.toY = _y;
      this.go();
    };

    Build.prototype.go = function () {
      this.canvas = document.getElementById('canv');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.$ = canv.getContext('2d');
      this.$.globalCompositeOperation = 'source-over';
      this.varr = [];
      this.dist = [];
      this.calc = [];

      // Load both images
      this.shopImage = new Image();
      this.shopImage.src = 'tobi.png';
      this.bagImage = new Image();
      this.bagImage.src = 'shopify-bag.png';

      // Add regular stars
      for (let i = 0, len = num; i < len; i++) {
        this.add();
      }

      // Add Shopify bag star
      this.varr.push(
        new threeD({
          vtx: { x: rnd(), y: rnd(), z: rnd() },
          sz: { x: 0, y: 0, z: 0 },
          rot: { x: 20, y: -20, z: 0 },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        }),
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });

      // Add Tobi star
      this.varr.push(
        new threeD({
          vtx: { x: rnd(), y: rnd(), z: rnd() },
          sz: { x: 0, y: 0, z: 0 },
          rot: { x: 20, y: -20, z: 0 },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        }),
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });

      // Add north star (existing code)
      this.varr.push(
        new threeD({
          vtx: { x: rnd(), y: rnd(), z: rnd() },
          sz: { x: 0, y: 0, z: 0 },
          rot: { x: 20, y: -20, z: 0 },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        }),
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });

      this.rotObj = { x: 0, y: 0, z: 0 };
      this.objSz = { x: w / 5, y: h / 5, z: w / 5 };
    };

    Build.prototype.add = function () {
      this.varr.push(
        new threeD({
          vtx: { x: rnd(), y: rnd(), z: rnd() },
          sz: { x: 0, y: 0, z: 0 },
          rot: { x: 20, y: -20, z: 0 },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        }),
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });
    };

    Build.prototype.upd = function () {
      cam.obj.x += (this.toX - cam.obj.x) * 0.05;
      cam.obj.y += (this.toY - cam.obj.y) * 0.05;
    };

    Build.prototype.draw = function () {
      this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      cam.upd();
      this.rotObj.x += 0.01;
      this.rotObj.y += 0.01;
      this.rotObj.z += 0.01;

      for (let i = 0; i < this.varr.length; i++) {
        for (const val in this.calc[i]) {
          if (this.calc[i].hasOwnProperty(val)) {
            this.calc[i][val] += this.vel;

            if (this.calc[i][val] > this.lim) {
              this.calc[i][val] = 0;
            }
          }
        }

        this.varr[i].transIn.pos = {
          x: this.diff * Math.cos((this.calc[i].x * Math.PI) / 180),
          y: this.diff * Math.sin((this.calc[i].y * Math.PI) / 180),
          z: this.diff * Math.sin((this.calc[i].z * Math.PI) / 180),
        };
        this.varr[i].transIn.rot = this.rotObj;
        this.varr[i].transIn.sz = this.objSz;
        this.varr[i].vupd();

        if (this.varr[i].transOut.p < 0) {
          continue;
        }

        let size;

        if (i === this.varr.length - 1) {
          size = 30; // North star
        } else if (i === this.varr.length - 2) {
          size = 10; // Tobi star
        } else if (i === this.varr.length - 3) {
          size = 10; // Shopify bag star
        } else {
          size = 2; // Regular stars
        }

        const g = this.$.createRadialGradient(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          (this.varr[i].transOut.p * size) / 3,
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * size,
        );

        this.$.globalCompositeOperation = 'lighter';

        if (i === this.varr.length - 1) {
          // North star colors - updated to Shopify green
          g.addColorStop(0, 'hsla(89, 50%, 80%, 1)'); // Light green
          g.addColorStop(0.3, 'hsla(89, 62%, 52%, 1)'); // Main Shopify green (#96bf48)
          g.addColorStop(0.6, 'hsla(89, 62%, 42%, 0.5)'); // Darker green
          g.addColorStop(1, 'hsla(89, 62%, 32%, 0)'); // Darkest green, faded
        } else if (i === this.varr.length - 2 || i === this.varr.length - 3) {
          // Tobi and Shopify bag stars colors
          g.addColorStop(0, 'hsla(89, 50%, 80%, 1)'); // Light green
          g.addColorStop(0.3, 'hsla(89, 62%, 52%, 1)'); // Main Shopify green (#96bf48)
          g.addColorStop(0.6, 'hsla(89, 62%, 42%, 0.5)'); // Darker green
          g.addColorStop(1, 'hsla(89, 62%, 32%, 0)'); // Darkest green, faded

          // Draw the glow
          this.$.fillStyle = g;
          this.$.beginPath();
          this.$.arc(
            this.varr[i].transOut.x,
            this.varr[i].transOut.y,
            this.varr[i].transOut.p * size,
            0,
            Math.PI * 2,
            false,
          );
          this.$.fill();
          this.$.closePath();

          // Draw the appropriate image
          const imgSize = this.varr[i].transOut.p * size * 1.5;
          this.$.globalCompositeOperation = 'source-over';

          const image = i === this.varr.length - 2 ? this.shopImage : this.bagImage;
          this.$.drawImage(
            image,
            this.varr[i].transOut.x - imgSize / 2,
            this.varr[i].transOut.y - imgSize / 2,
            imgSize,
            imgSize,
          );
          continue;
        } else {
          // Regular star colors
          g.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // Pure white
          g.addColorStop(0.5, 'hsla(0, 0%, 100%, 0.5)'); // Semi-transparent white
          g.addColorStop(1, 'hsla(0, 0%, 100%, 0)'); // Transparent
        }

        this.$.fillStyle = g;
        this.$.beginPath();
        this.$.arc(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * size,
          0,
          Math.PI * 2,
          false,
        );
        this.$.fill();
        this.$.closePath();
      }
    };

    Build.prototype.anim = function () {
      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      const anim = function () {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      }.bind(this);
      window.requestAnimationFrame(anim);
    };

    Build.prototype.run = function () {
      this.anim();

      window.addEventListener('mousemove', (e) => {
        this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
      });
      window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
      });
      window.addEventListener('mousedown', (e) => {
        for (let i = 0; i < 100; i++) {
          this.add();
        }
      });
      window.addEventListener('touchstart', (e) => {
        e.preventDefault();

        for (let i = 0; i < 100; i++) {
          this.add();
        }
      });
    };

    const app = new Build();
    app.run();

    window.addEventListener(
      'resize',
      () => {
        const canvas = document.getElementById('canv');

        if (canvas) {
          canvas.width = w = window.innerWidth;
          canvas.height = h = window.innerHeight;
        }
      },
      false,
    );
  };

  run();
};

export default getStars;

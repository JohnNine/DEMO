let axios = require("axios")

const util = {
	videoParams(videoId) {
		let stamp = +new Date() + "";
		let resObj = {
			callback: "videoResolve",
			charge: 0,
			defaultfmt: "auto",
			otype: "json",
			guid: "8219e50d644ef0e9da0d5a35006360c4",
			flowid: "e96ef281aa234b03b184c495e6dbdc85_11001",
			platform: 11001,
			sdtfrom: "v5010",
			defnpayver: 0,
			appVer: "3.3.555",
			host: "m.v.qq.com",
			ehost: `https://m.v.qq.com/page/q/l/r/${videoId}.html`,
			refer: "m.v.qq.com",
			sphttps: 1,
			sphls: "",
			_rnd: parseInt(stamp.substr(0, 10)),
			spwm: 4,
			vid: videoId,
			defn: "auto",
			fhdswitch: "",
			show1080p: false,
			dtype: 1,
			clip: 4,
			defnsrc: "",
			fmt: "auto",
			defsrc: 1,
			_qv_rmt: "j9eVkvvOA14004DqO=",
			_qv_rmt2: "toev04kS154805lWQ="
		};
		resObj[`_${stamp}`] = "";
		return resObj;
	},
	calcVideoTimed(time) {
		time = parseFloat(time);
		let HH = util.padStartZero(Math.trunc(time / 3600));
		let MM = util.padStartZero(Math.trunc(time / 60));
		let ss = util.padStartZero(Math.trunc(time % 60));
		return `${HH}:${MM}:${ss}`;
	},
	async getVideoSource(vid) {
		let params = util.videoParams(vid);
		let { sdtfrom, guid } = params;
		try {
			let videoData = await axios.get(
				"https://h5vv.video.qq.com/getinfo",
				{
					params,
					headers: {
						userAgent:
							"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36"
					}
				}
			);
			let { data } = videoData;
			data = JSON.parse(
				data.substr(0, data.length - 1).replace(/videoResolve\(/, "")
			);
			let { fn: name, td: time, fvkey: vkey, ul } = data.vl.vi[0];
			let { url } = ul.ui[0];
			time = util.calcVideoTimed(time);
			return {
				posterURI: `http://puui.qpic.cn/qqvideo_ori/0/${vid}_496_280/0`,
				videoURI: `${url}${name}?sdtfrom=${sdtfrom}&guid=${guid}&vkey=${vkey}&platform=2`,
				time
			};
		} catch (error) {
			console.error("获取视频错误", error);
		}
	}
};
module.exports = util
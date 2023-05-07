// create Agora client
var client = AgoraRTC.createClient({
  mode: "live",
  codec: "vp8"
});
AgoraRTC.enableLogUpload();
var localTracks = {
  videoTrack: null,
  audioTrack: null
};
var remoteUsers = {};
// Agora client options
var options = {
  appid: null,
  channel: null,
  uid: null,
  token: null,
  role: "audience",
  // host or audience
  audienceLatency: 2
};

var mockOpt = {
  appid: "e3e16446c0d44bb6a04597f0668b9b6a",
  channel: "superstar_video_3_373326",
  uid: null,
  token: null,
  role: "audience",
  audienceLatency: 1  
}

function reqJion(appid, channel, token="", uid="") {
  options.appid = appid;
  options.channel = channel;
  options.role = 'audience';
  options.token = token;
  options.uid = uid;
  options.audienceLatency = 1;
}

async function join(opt) {
  // create Agora client
  if (opt.role === "audience") {
    client.setClientRole(opt.role, {
      level: opt.audienceLatency
    });
    // add event listener to play remote tracks when remote user publishs.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
  } 
  // join the channel
  opt.uid = await client.join(opt.appid, opt.channel, opt.token || null, opt.uid || null);  
}

async function leave() {
  for (trackName in localTracks) {
    var track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      localTracks[trackName] = undefined;
    }
  }

  // remove remote users and player views
  remoteUsers = {};
  $("#remote-playerlist-1").html("");
  // leave the channel
  await client.leave();
  console.log("client leaves channel success");
}



async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await client.subscribe(user, mediaType);
  console.log("subscribe success");
  if (mediaType === 'video') {
    const player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
    
    $("#remote-playerlist-1").append(player);
    user.videoTrack.play(`player-${uid}`, {
      fit: "contain"
    });
    
    //get browser-native object MediaStreamTrack from WebRTC SDK
    const msTrack = user.videoTrack.getMediaStreamTrack();
    //generate browser-native object MediaStream with above video track
    const ms = new MediaStream([msTrack]);
  }

  if (mediaType === 'audio') {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

function handleUserUnpublished(user, mediaType) {
  if (mediaType === 'video') {
    const id = user.uid;
    delete remoteUsers[id];
    $(`#player-wrapper-${id}`).remove();
  }
}


var win;
function testOpenNewWindow(text) {
  win =window.open('./showView1.html', '_blank', 'width=500,height=500');
  // win = window.open();  //開啟新的空白視窗
  win.document.write ("<h1>url:"+win.location.href+"</h1>");  //在新視窗中輸出提示資訊
  win.focus ();  //讓原視窗獲取焦點
  //win.opener.document.write ("<h1>這是原來視窗</h1>");  //在原視窗中輸出提示資訊
  console.log(win.opener == window);  //檢測window.opener屬性值
}

function testCloseWindow() {
  win.close();
}
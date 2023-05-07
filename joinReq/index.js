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

var mockOptions = {
  appid: "e3e16446c0d44bb6a04597f0668b9b6a",
  channel: "superstar_video_3_373326",
  uid: null,
  token: null,
  role: "audience",
  audienceLatency: 1  
}

// the demo can auto join channel with params in url
$(() => {
  var urlParams = new URL(location.href).searchParams;
  options.appid = urlParams.get("appid");
  options.channel = urlParams.get("channel");
  options.token = urlParams.get("token");
  options.uid = urlParams.get("uid");
  if (options.appid && options.channel) {
    $("#uid").val(options.uid);
    $("#appid").val(options.appid);
    $("#token").val(options.token);
    $("#channel").val(options.channel);
    $("#join-form").submit();
  }
});
$("#host-join").click(function (e) {
  options.role = "host";
});
$("#lowLatency").click(function (e) {
  options.role = "audience";
  options.audienceLatency = 1;
  $("#join-form").submit();
});

function mockJoin() {
  options = mockOptions;
  if (options.appid && options.channel) {
    $("#uid").val(options.uid);
    $("#appid").val(options.appid);
    $("#token").val(options.token);
    $("#channel").val(options.channel);
    $("#join-form").submit();
  }
 // $("#join-form").submit();
}

function reqJion(appid, channel, token="", uid="") {
  options.appid = appid;
  options.channel = channel;
  options.role = 'audience';
  options.token = token;
  options.uid = uid;
  options.audienceLatency = 1;
  if (options.appid && options.channel) {
    $("#uid").val(options.uid);
    $("#appid").val(options.appid);
    $("#token").val(options.token);
    $("#channel").val(options.channel);
    $("#join-form").submit();
  }
}

$("#ultraLowLatency").click(function (e) {
  options.role = "audience";
  options.audienceLatency = 2;
  $("#join-form").submit();
});
$("#join-form").submit(async function (e) {
  e.preventDefault();
  $("#host-join").attr("disabled", true);
  $("#audience-join").attr("disabled", true);
  try {
    options.channel = $("#channel").val();
    options.uid = Number($("#uid").val());
    options.appid = $("#appid").val();
    options.token = $("#token").val();
    await join();
    if (options.role === "host") {
      $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
      if (options.token) {
        $("#success-alert-with-token").css("display", "block");
      } else {
        $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
        $("#success-alert").css("display", "block");
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    $("#leave").attr("disabled", false);
  }
});
$("#leave").click(function (e) {
  leave();
});
async function join() {
  // create Agora client

  if (options.role === "audience") {
    client.setClientRole(options.role, {
      level: options.audienceLatency
    });
    // add event listener to play remote tracks when remote user publishs.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
  } else {
    client.setClientRole(options.role);
  }

  // join the channel
  options.uid = await client.join(options.appid, options.channel, options.token || null, options.uid || null);
  if (options.role === "host") {
    // create local audio and video tracks
    if (!localTracks.audioTrack) {
      localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: "music_standard"
      });
    }
    if (!localTracks.videoTrack) {
      localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    }
    // play local video track
    localTracks.videoTrack.play("local-player");
    $("#local-player-name").text(`localTrack(${options.uid})`);


    //get browser-native object MediaStreamTrack from WebRTC SDK
    const msTrack = localTracks.videoTrack.getMediaStreamTrack();
    //generate browser-native object MediaStream with above video track
    const ms = new MediaStream([msTrack]);


    // publish local tracks to channel
    await client.publish(Object.values(localTracks));
    console.log("publish success");
  }
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
  $("#local-player-name").text("");
  $("#host-join").attr("disabled", false);
  $("#audience-join").attr("disabled", false);
  $("#leave").attr("disabled", true);

  $("#joined-setup").css("display", "none");
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
//    $("#remote-playerlist-2").append(player);

        // 使用jQuery的AJAX方法獲取另一個HTML文件
    $.ajax({
      url: 'showView1.html',
      success: function(data) {
        // 將HTML文件中的內容插入到當前頁面中
        var otherHtml = $(data);
        $('body').append(otherHtml);

        // 選擇id為"mydiv2"的div元素並操作它
        var mydiv2 = $('#remote-playerlist-1');
        mydiv2.append(player);

        user.videoTrack.play(`player-${uid}`, {
          fit: "contain"
        });
    
        //get browser-native object MediaStreamTrack from WebRTC SDK
        const msTrack = user.videoTrack.getMediaStreamTrack();
        //generate browser-native object MediaStream with above video track
        const ms = new MediaStream([msTrack]);
      }
    });


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
  win =window.open('./showView1', '_blank', 'width=500,height=500');
 // win = window.open();  //開啟新的空白視窗
win.document.write ("<h1>url:"+win.location.href+"</h1>");  //在新視窗中輸出提示資訊
win.focus ();  //讓原視窗獲取焦點
//win.opener.document.write ("<h1>這是原來視窗</h1>");  //在原視窗中輸出提示資訊
console.log(win.opener == window);  //檢測window.opener屬性值

}

function testCloseWindow() {
  win.close();
}
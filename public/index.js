function Init(prop) {
    let podName = ''
    return prop.state.status === 0 ? < div className = "podInit" >
        <
        p > Click start, get a link, share and sing to your adoring listeners  < /p>  <
        div className = "row" > < button onClick = {
            () => {
                prop.initPod(podName)
            }
        } > Start < /button>

        <
        /div></div > : '';
}

function Visuals(prop) {
    if (prop.state.status === 2 && prop.state.stream && !prop.state.isOwner) {
        let bars = [];
        for (let i = 0; i < 10; i++) bars.push( < div className = "bar"
            key = {
                i
            } > < /div>)
            return <div id = 'bars' > {
                    bars
                } <
                /div>
        }
        else return ''
    }

    function EmojiFeed() {
        return <div class = "emoji-wrap" >
            <
            /div>
    }

    function Emoji(prop) {
        if (prop.idx === 0) {
            return <div class = "emoji  emoji--like"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__hand"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__thumb" > < /div> <
                /div> <
                /div>
        }
        if (prop.idx === 1) {
            return <div class = "emoji  emoji--love"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__heart" > < /div> <
                /div>
        }
        if (prop.idx === 2) {
            return <div class = "emoji  emoji--haha"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__face" >
                <
                div class = "emoji__eyes" > < /div> <
                div class = "emoji__mouth" >
                <
                div class = "emoji__tongue" > < /div> <
                /div> <
                /div> <
                /div>
        }
        if (prop.idx === 3) {
            return <div class = "emoji  emoji--yay"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__face" >
                <
                div class = "emoji__eyebrows" > < /div> <
                div class = "emoji__mouth" > < /div> <
                /div> <
                /div>
        }
        if (prop.idx === 4) {
            return <div class = "emoji  emoji--wow"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__face" >
                <
                div class = "emoji__eyebrows" > < /div> <
                div class = "emoji__eyes" > < /div> <
                div class = "emoji__mouth" > < /div> <
                /div> <
                /div>
        }
        if (prop.idx === 5) {
            return <div class = "emoji  emoji--sad"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__face" >
                <
                div class = "emoji__eyebrows" > < /div> <
                div class = "emoji__eyes" > < /div> <
                div class = "emoji__mouth" > < /div> <
                /div> <
                /div>
        }
        if (prop.idx === 6) {
            return <div class = "emoji  emoji--angry"
            onClick = {
                    () => {
                        prop.sendEmo(prop.idx)
                    }
                } >
                <
                div class = "emoji__face" >
                <
                div class = "emoji__eyebrows" > < /div> <
                div class = "emoji__eyes" > < /div> <
                div class = "emoji__mouth" > < /div> <
                /div> <
                /div>
        } else return ''
    }


    function Controls(prop) {
        if (prop.state.status === 2 && prop.state.stream) {
            return <div className = "row" >
                <
                button onClick = {
                    () => {
                        prop.destroyPod()
                    }
                } > {
                    prop.state.isOwner ? 'End Broadcast' : 'Stop'
                } < /button> <
                button onClick = {
                    () => {
                        prop.mute()
                    }
                } > Mute < /button> <
                button onClick = {
                    () => {
                        prop.unmute()
                    }
                } > Unmute < /button> <
                /div>;
        } else return ''
    }

    function UrlInfo(prop) {
        return  <div className="column"> <p > share this link < /p> <
            a href = {
                prop.url
            }
        target = "_blank" > {
                prop.url
            } < /a> </div>
    }
    function Tally(prop){
      return <p> Active Listeners {
                prop.connected
            } < /p>
    }


    function Player() {
        return <audio > < /audio>
    }

    function Mic(prop) {
        if (prop.state.status === 2 && prop.state.stream && prop.state.isOwner) {
            return <div className = "container" >
                <
                button id = "speech"
            className = "btn" >
                <
                i className = "fa fa-microphone"
            aria-hidden = "true" > < /i> <
                div className = "pulse-ring" > < /div> <
                /button> <
                /div>
        } else return ''
    }
    class Radio extends React.Component {
            constructor() {
                super()
                this.state = {
                    isowner: false,
                    status: 0,
                    params: {
                        audio: true,
                        video: false
                    },
                    socket: io(),
                    pod: {
                        id: window.location.hash,
                        name: ''
                    },
                    peerObjs: {},
                    stream: null,
                    url: '',
                    reactions: []
                }
            }
            render() {
                    let emojiBar = []
                    for (let i = 0; i <= 6; i++) {
                        // console.log(i)
                        emojiBar.push( <
                            Emoji key = {
                                i
                            }
                            sendEmo = {
                                this.sendEmo
                            }
                            idx = {
                                i
                            }
                            />)
                        }

                        return <div className = "wrapper" >
                            <
                            h1 > Sing Aloud!!! < /h1> <
                            Init state = {
                                this.state
                            }
                        initPod = {
                            this.initPod
                        }
                        joinPod = {
                            this.joinPod
                        }
                        surf = {
                            this.surf
                        }
                        /> <
                        Visuals state = {
                            this.state
                        }
                        />

                        <
                        Mic state = {
                            this.state
                        }
                        />

                        <
                        Player / >
                        <div className="column"> {
                            this.state.status === 2 ?
                            <
                            UrlInfo  url = {
                                this.state.url
                            }
                            id = {
                                this.state.pod.id
                            }
                            />:''}
                            {this.state.isOwner&&this.state.status===2?<Tally  connected={Object.keys(this.state.peerObjs).length}/>:''}
                            </div>
                            <
                            Controls mute = {
                                this.mute
                            }
                            unmute = {
                                this.unmute
                            }
                            destroyPod = {
                                this.destroyPod
                            }
                            state = {
                                this.state
                            }
                            /> {
                                this.state.isOwner ? < EmojiFeed / > : this.state.status == 2 ? <div className="column"> <p>rate this voice!!</p> < div className = "row" > {
                                    emojiBar
                                } < /div></div>:''
                            } <
                            /div>

                        }
                        sendEmo = (e) => {
                            this.state.socket.emit('praiseorboos', e)
                        }
                        componentDidMount() {
                            this.state.socket.on('joined', (data) => {
                                // console.log('joined', data)
                                if (!window.location.hash)
                                    this.setState({
                                        pod: data,
                                        status: 1,
                                        url: window.location.href + '#' + data.id
                                    })
                                else
                                    this.setState({
                                        pod: data,
                                        status: 1,
                                        url: window.location.href
                                    })
                                this.createWebRTCPeer(data.owner, false)
                            })
                            this.state.socket.on('created', (data) => {
                                // console.log('received created', data)
                                this.setState({
                                    status: 2,
                                    url: window.location.href + '#' + data.id
                                })
                            })
                            this.state.socket.on('signal', (data) => {
                                // console.log(this.state.peerObjs, data.by)
                                this.state.peerObjs[data.by].signal(data.content)
                            })
                            this.state.socket.on('ready', (id) => {
                                this.createWebRTCPeer(id, true)
                            })
                            this.state.socket.on('clean', (id) => {
                                this.removeWebRTCPeer(id)
                            })
                            this.state.socket.on('stop', () => {
                                this.destroyPod()
                            })
                            
                            this.state.socket.on('praisesandboos', (e) => {
                                // console.log( e)
                                this.showEmoji(e)
                            })
                            this.state.socket.on('')
                            if (this.state.pod.id) this.state.socket.emit('join', this.state.pod.id.split('#')[1])

                        }
                        initPod = () => {
                            this.setState({
                                status: 1,
                                isOwner: true
                            })
                            this.getAudioMedia()
                        }
                        joinPod = (e) => {
                            this.state.socket.emit('join', e)
                        }
                        mute = () => {
                            this.state.stream.getAudioTracks()[0].enabled = false;
                        }
                        unmute = () => {
                            this.state.stream.getAudioTracks()[0].enabled = true;
                        }

                        surf = () => {
                            this.state.socket.emit('podSurf')
                        }
                        destroyPod = () => {
                            // console.log(this.stream)
                            if (this.state.stream) {
                                try {
                                    this.state.stream.stop()
                                } catch (e) {
                                    this.state.stream.getTracks().forEach(track => {

                                        track.stop();
                                    });


                                }
                            }
                            if (this.state.isOwner) this.state.socket.emit('stop')
                            this.setState({
                                stream: null,
                                status: 0,
                                pod: {},
                                isOwner: false
                            })
                          Object.values(this.state.peerObjs).forEach(peer=>{
                            try{
                              peer.destroy()
                              }catch(e){}
                          })
                        }
                        createPod() {
                            this.state.socket.emit('create', this.state.pod.name)
                        }
                        createWebRTCPeer(id, initiator) {
                            //TURN server might go offline in a day or two
                            const props = {
                                initiator: initiator,
                                stream: false,
                                config: {
                                    'iceServers': [{
                                        urls: 'stun:stun.l.google.com:19302'
                                    }, {
                                        urls: 'stun:global.stun.twilio.com:3478?transport=udp'
                                    }, {
                                        urls: 'turn:34.74.159.239:80',
                                        'credential': 'password',
                                        'username': 'at'
                                    }]
                                }
                            }
                            if (this.state.isOwner || this.state.stream)
                                props.stream = this.state.stream
                            const peer = new SimplePeer(props)
                            peer.on('signal', data => {
                                this.state.socket.emit('signal', {
                                    to: id,
                                    content: data
                                })
                                // console.log('signaling', data)
                            })
                            if (!this.state.isOwner) {
                                peer.on('stream', stream => {
                                    // console.log('got remote stream', stream)

                                    this.appendStream(stream)
                                })

                                peer.on('close', () => {
                                   this.removeWebRTCPeer(id)
                                })
                            }
                            peer.on('error', (err) => {

                            })
                            peer.on('end', (err) => {

                                // console.log('end')
                            })
                            // peer.on('track', (track, stream) => {
                            //     removeMedia(`#${id}`)
                            //     eleAppender(eleCreator(this.params.video, stream, `${id}`), `#${id}`)
                            // })
                            let peers = {
                                ...this.state.peerObjs
                            }
                            peers[id] = peer
                            this.setState({
                                peerObjs: peers
                            })
                            // console.log(this.state.peerObjs)
                            if (!initiator)
                                this.state.socket.emit('ready', id)
                        }
                        appendStream(stream) {
                            let ele = document.createElement('audio')
                            if ('srcObject' in ele) {
                                ele.srcObject = stream
                            } else {
                                ele.src = window.URL.createObjectURL(stream) // for older browsers
                            }




                            const playPromise = ele.play();
                            if (playPromise !== null) {
                                playPromise.then(() => {
                                    this.setState({
                                        status: 2
                                    })
                                }).catch(() => {
                                    ele.play();
                                })
                            }

                            this.setState({
                                stream: stream
                            })
                        }

                        getAudioMedia() {
                            try {
                                // console.log('starting')
                                navigator.mediaDevices.getUserMedia(this.state.params)
                                    .then((stream) => {
                                        this.state.stream = stream
                                        this.createPod()
                                    })
                                    .catch(this.error);
                            } catch (e) {

                                // console.log('starting1')
                                navigator.getUserMedia = navigator.getUserMedia ||
                                    navigator.webkitGetUserMedia ||
                                    navigator.mozGetUserMedia;
                                navigator.getUserMedia(this.state.params, (stream) => {
                                    this.state.stream = stream
                                    this.createPod()
                                }, this.error)
                            }
                        }
                        error(e) {
                            console.error(e);
                        }
                        removeWebRTCPeer(id) {
                            try {
                                this.state.peerObjs[id].destroy()
                            } catch (e) {

                            }
                            try{
                             this.setState({peerObjs:Object.keys(this.state.peerObjs).reduce((object, key) => {
                                if (key !== id) {
                                    object[key] = this.state.peerObjs[key]
                                      }
                                  return object
                                }, {})})
                                }catch(e){

                                }
                        }
                        onEnd(e) {
                            try {
                                e.remove()
                            } catch (e) {

                            }
                        }
                        showEmoji(idx) {
                            try {
                                let emojis = document.querySelectorAll('.emoji')
                                if (this.state.reactions.length > 5)
                                    this.state.reactions.shift()
                            } catch (e) {}
                            this.setState({
                                reactions: [...this.state.reactions, idx]
                            })
                            const emojis = this.state.reactions.map(ids => < Emoji idx = {
                                    ids
                                }
                                />)
                                ReactDOM.render(emojis, document.querySelector('.emoji-wrap'))
                            }
                        }

                        ReactDOM.render( < Radio / > , document.getElementById('mount-point'))
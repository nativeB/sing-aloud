const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const path = require('path');
const pods = {};
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});
io.on('connection',
    (socket) => {
        socket.on('create', () => {
            crypto.randomBytes(7, (err, buf) => {
                if (err) return console.log(err);

                try {
                    const podData = {
                        owner: socket.id,
                        id: buf.toString('hex'),
                        streams: {},
                        created_at: Date.now(),
                    };
                    addPod(podData);

                    socket.currentPod = podData.id;
                    socket.emit('created', podData);
                } catch (e) {}
            });
        });
        socket.on('join', (podId) => {
            const pod = getPod(podId);
            socket.join(pod.id);
            addMember(podId, socket.id);
            socket.currentPod = podId;
            socket.emit('joined', pod);
        });

        socket.on('signal', (data) => {
            io.to(data.to).emit('signal', {
                content: data.content,
                by: socket.id
            });
        });
        socket.on('disconnect', () => {
            try {
                io.to(getOwner(socket.currentPod)).emit('clean', socket.id);
                handleRemoval(socket.currentPod, socket.id);
            } catch (e) {
            }
        });
        socket.on('ready', (id) => {
            io.to(id).emit('ready', socket.id);
        });
        socket.on('praiseorboos', (idx) => {
            try {
                io.to(getOwner(socket.currentPod)).emit('praisesandboos', idx);
            } catch (e) {
            }
        });
        socket.on('stop', () => {
            io.to(socket.currentPod).emit('stop');
            delete pods[socket.currentPod];
        });

       
    });

server.listen(3000, function() {
    console.log('Server listening at port %d', 3000);
});


// helpers

function addPod(data) {
    pods[data.id] = data;
    // console.log(pods)
}
// function randomPod() {
// const podKeys=Object.keys(pods),
// podId=rand(podKeys.length);
// console.log(podKeys,podId)
// return podKeys[podId];
// }
// function rand(val) {
// return Math.floor(Math.random() * val);
// }
function addMember(pod, member) {
    // console.log(pods[pod])
    if (pods[pod]) {
        try {
            pods[pod]['members'].push(member);
        } catch (e) {
            pods[pod]['members'] = [member];
        }
    }
}

function getOwner(podId) {
    return pods[podId].owner;
}

function getPod(podId) {
    try {
        const pod = pods[podId];
        return {
            created_at: pod.created_at,
            owner: pod.owner
        };
    } catch (e) {

    }
}

function handleRemoval(pod, member) {
    try {
        const peerIdx = pods[pod]['members'].findIndex(member);
        pods[pod]['members'].splice(peerIdx, 1);
    } catch (e) {
    }
}
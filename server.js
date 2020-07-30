const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt')
const saltRounds = 10;

//elephant mail : bemima7536@cartmails.com
//elephant mail pwd : 4Tef@VEP8A7aU3D
//https://api.elephantsql.com/console/a9ffee4c-d0b8-4837-bdc5-45fec8be7322/details?

const db = knex({
  client: 'pg',
  connection:'postgres://otgjukau:J3vfNxuwDYjGofAXvwx1ImEEWPXT3eLa@john.db.elephantsql.com:5432/otgjukau'
  // pool: {
  //   min: 0,
  //   max: 7,
  //   afterCreate: (conn, done) => {
  //     conn.query('SET timezone="UTC";', (err)=>{
  //       if (err) {
  //         console.log(err)
  //       }
  //       console.log(conn)
  //       done(err, conn)
  //     })
  //   }
  // }
});

// db.select('*').from('login')
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
// app.get('/', (req, res) => res.send('Connected.')) /*check server connection*/

app.post('/api/signin', (req, res) => {
  db.select('user_email', 'user_password').from('login')
    .where('user_email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].user_password);
      // console.log(isValid);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            console.log('Sign In Success.');
            res.json(user[0])
          })
          .catch(err => res.status(400).json('Server side error.'))
      } else {
        res.status(400).json('Wrong Credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})


app.post('/api/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    db.transaction(trx => {
      trx.insert({
        user_password: hash,
        user_email: req.body.email
      })
      .into('login')
      .returning('user_email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name: req.body.name,
            email: loginEmail[0],
            datejoined: new Date(),
            branch: req.body.branch,
            semester: req.body.semester
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
})

app.post('/api/mydoubts', (req,res) => {
  db.select('*').from('doubts')
    .where('doubt_raised_by', '=', req.body.user_id)
    .orderBy('doubt_id','desc')
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => res.status(400).json('Error fetching My Doubts.'))
})

app.post('/api/othersdoubts', (req,res) => {
  db.select('*').from('doubts')
    .where('doubt_raised_by', '!=', req.body.user_id)
    .orderBy('doubt_id','desc')
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => res.status(400).json('Error fetching My Doubts.'))
})


app.get('/api/doubt/:doubt_id', (req, res) => {
  const doubt_id = req.params.doubt_id;
  console.log("Doubt Item "+doubt_id+" opened.");
  db.select('*').from('doubts')
    .where('doubt_id', '=', doubt_id)
    .then(data => {
      // console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json('Error fetching Doubt Details'))
})

app.post('/api/doubtcard', (req,res) => {
  db.select('*').from('doubts')
    .where('doubt_id', '=', req.body.doubt_id)
    .then(data => {
      // console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json('Error fetching Doubt Card'))
})

app.post('/api/solutionfordoubt', (req,res) => {
  db.select('*').from('answers')
    .where('ans_of_doubt_id', '=', req.body.doubt_id)
    .orderBy('ans_id','desc')
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => res.status(400).json('Error fetching Solutions for Doubts.'))
})


app.post('/api/solutioncard', (req,res) => {
  db.select('*').from('answers')
    .where('ans_id', '=', req.body.ans_id)
    .then(data => {
      console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json('Error fetching Solution Card'))
})

app.post('/api/solutionpostedby', (req,res) => {
  db.select('name').from('users')
    .where('user_id', '=', req.body.user_id)
    .then(data => {
      // console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json('Error fetching UserName of user who posted solution.'))
})

app.post('/api/doubtpostedby', (req,res) => {
  db.select('name').from('users')
    .where('user_id', '=', req.body.user_id)
    .then(data => {
      // console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json('Error fetching UserName of user who posted Doubt.'))
})

app.post('/api/addanswer', (req,res) => {
  db('answers')
    .insert({
        ans_of_doubt_id: req.body.ans_of_doubt_id,
        ans_content: req.body.ans_content,
        ans_date: new Date(),
        ans_posted_by: req.body.ans_posted_by
      })
    .then(() => {
      // console.log(data[0]);
      res.json('Successful entry to answers table.');
    })
    .catch(err => res.status(400).json('Error inserting answer.'))
})

app.post('/api/adddoubt', (req,res) => {
  db('doubts')
    .insert({
        doubt_title: req.body.doubt_title,
        doubt_content: req.body.doubt_content,
        doubt_raise_date: new Date(),
        doubt_raised_by: req.body.doubt_raised_by,
        doubt_answered: false
      })
    .then(() => {
      // console.log(data[0]);
      res.json('Successful entry to Doubts table.');
    })
    .catch(err => res.status(400).json('Error inserting Doubt.'))
})

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
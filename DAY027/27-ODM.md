# Mongoose ODM

- Object Document Mapping => 객체와 문서를 1:1 매칭한다는 뜻
- 시퀄라이즈와는 달리 릴레이션이 아닌 도큐먼트를 사용하므로 ORM이 아닌 ODM
- Object는 자바스크립트 객체이고, Document는 mongoDB 문서
- MongoDB의 Collection을 객체화하여, 관련 기능들을 쉽게 사용할 수 있도록 도와줌

=> 몽고디비의 컬렉션을 자바스크립트의 객체로 만들어 놓고 이 모델을 통해 몽고디비의 데이터에 접근하여 수정 및 삭제할 수 있게 도와주는 패키지

- **MongoDB 자체가 자바스크립트인데 굳이 자바스크립트 객체와 매핑해서 사용하는 이유?

=> MongoDB에 없어서 불편한 점들을 Mongoose가 보완해주어 서버단에서 NoSQL DB를 프로그래밍하는데 최적화해주기 때문

## Mongoose ODM을 사용하는 이유

### 연결 관리

- MongoDB의 기본 Node.js 드라이버는 연결 상태를 관리하기 어려움
- Mogoose를 사용하면 간단하게 데이터베이스와의 연결 상태를 관리 가능

### 스키마 관리

- MongoDB는 스키마 개념이 없음
- 스키마를 정의하지 않고 데이터를 사용할 수 있는 것은 NoSQL의 장점이지만, 데이터 형식을 미리 정의해야 코드 작성과 프로젝트 관리에 유용
- Mongoose는 Code-Level에서 스키마를 정의하고 관리 가능
- 데이터를 넣기 전 노드 서버 단에서 데이터를 한 번 필터링하는 역할
- (SQL의 table과 비슷한 개념)

### Populate

- MongoDB는 기본적으로 Join을 제공하지 않음
- Join과 유사한 기능을 사용하기 위해선 aggregat라는 복잡한 쿼리를 해야 하지만, Mongoose는 populate를 사용하여 간단하게 구현 가능
- ORM에서 자동으로 JOIN 매핑을 해주듯, ODM에도 자동으로 populate해서 유기적이고 편리하게 관계 기능 사용 가능

# Mongoose ODM 사용법

## 스키마 정의

- Collection에 저장될 Document의 스키마를 code-level에서 관리할 수 있도록 Schema 작성
- Schema란 데이터를 넣는 테이블
- 형식을 미리 지정하여 생성, 수정 작업 시 데이터 형식을 체크해주는 기능 제공
- timestamps 옵션을 사용하면 생성, 수정 시간을 자동으로 기록해줌
- Mongoose-sequence plugin을 통해 값이 자동으로 증가하는 필드를 만들 수 있음(Auto Increment)

Member 정보 스키마(schemas/member.js)

```jsx
// 1. 모듈 불러오기
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const{Schema} = mongoose;

// 2. 스키마 정의
const memberSchema = new Schema({
    email: {
        type:String,
        required: true
    },
    member_password: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    profile_img_path: {
        type:String,
        required:false
    },
    telephone: {
        type:String,
        required:false
    },
    entry_type_code: {
        type:Number,
        required:true
    },
    use_state_code: {
        type:Number,
        required: true
    },
    birth_date: {
        type:String,
        required: false
    },
    reg_date: {
        type:Date,
        required: Date.now
    },
    reg_member_id: {
        type:Number,
        required: false
    },
    edit_date: {
        type:Date,
        default:Date.now
    },
    edit_member_id: {
        type:Number,
        default:false
    }
})

// 3. id를 AutoIncrement
memberSchema.plugin(AutoIncrement,{inc_field:"member_id"});

// 4. mongoose.model로 schema 모델 선언
module.exports = mongoose.model('Member', memberSchema);
```

channelMember 정보 스키마(schemas/member.js)

- type으로는 데이터타입이 아닌 몽고디비의 ID인 ObjectId를 기재하며, ref 속성에 관계를 맺은 스키마를 명시해두면, populate 메소드를 통해 자동으로 스키마끼리 데이터 관계를 맺어 불러올 수 있다

```jsx
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const{Schema} = mongoose;

const channelMemberSchema = new Schema({
	  member_id: {
        type:Number, 
        required: true,
        ref:'Member' // member.js 스키마에서 reference로 연결
    },
    nick_name: {
        type:Number,
        required: true
    },
    member_type_code: {
        type:Number,
        required: true
    },
    active_state_code: {
        type:Number,
        required: true
    },
    last_contact_date: {
        type:Date,
        required:Date.now
    },
    last_out_date: {
        type:Date,
        required:Date.now
    },
    connection_id: {
        type:String,
        required:false
    },
    ip_address: {
        type:String,
        required: false
    },
    edit_member_id: {
        type:Number,
        required: false
    },
    edit_date: {
        type:Date,
        required: Date.now
    }
})

module.exports = mongoose.model('ChannelMember', channelMemberSchema);
```

## 모델 만들기

- 작성된 스키마를 mogoose에서 사용할 수 있는 모델로 만들어야 함
- 모델의 이름을 지정하여 Populate 등에서 해당 이름으로 모델 호출 가능

```jsx

// model 함수 사용해서 Member라는 이름으로 memberSchema와 함께 전달해서 모델생성
// schemas/member.js
module.exports = mongoose.model('Member', memberSchema);

```

## 데이터베이스 연결

- connect 함수로 데이터베이스 연결
- mongoose에서 자동으로 연결을 관리하여 직접 연결 상태를 체크하지 않아도 모델 사용 시 연결 상태를 확인하여 사용이 가능할 때 작업을 실행

schemas/index.js

```jsx
const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        // 현재 소스 실행환경이 개발환경인 경우 디버깅 가능하게 설정
        mongoose.set('debug', true);
    }

    //몽고DB연결정보를 설정합니다.
    mongoose.connect('mongodb://eunbi:rladmsql7134!@localhost:27017/admin', {
        dbName: 'modu_chat',
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

//회원정보 콜렉션 모델을 참조합니다.
require('./member.js');

//게시글 ODM모델 추가 
require('./admin.js');

require('./channelMember.js');

module.exports = connect;
```

## 모델 사용

### CRUD

**CREATE**

- create

```jsx
async function main() {
    const created = await Post.create({
        title: 'first title',
        content: 'second title',
    });
    const multpleCreated = await Post.create([
        item1, 
        item2
    ]);
}
```

- Document Object나(단일 Document 생성) Document Object의 Array 전달(복수 Document 생성)
- 정의된 스키마 구조를 벗어나는 데이터들은 저장되지 않으며 데이터를 비워둘 경우 비워진 채로 저장됨

**READ**

- find, findById, findOne

```jsx
async function main() {
    const listPost = await Post.find(query); // 쿼리에 해당하는 모든 문서 찾음
    const onePost = await Post.findOne(query); // 쿼리에 해당하는 문서 중 첫번째 문서
    const postById = await Post.findById(id); // id에 해당하는 문서 찾음
}
```

- query를 사용하여 검색하거나 ObjectID로 Document를 검색할 수 있음
- find는 배열 형식, findOne, findById는 하나의 Document를 받아옴

**UPDATE**

- updateOne, updateMany, findByIdAndUpdate, findOneAndUpdate

```jsx
async function main() {
    const updateResult = await Post.updateOne(query, { // 첫번째 매칭되는 Document만 수정
    // 업데이트 할 내용
    });
    const updateResults = await Post.updateMany(query, { // 모든 Document 수정
    // 업데이트 할 내용
    });
    const postById = await Post.findByIdAndUpdate(id, { // 주어진 id에 해당하는 Document 업데이트
    // 업데이트 할 내용
    });
    const onePost = await Post.findOneAndUpdate(query, {  // 쿼리에 매칭되는 문서 중 첫번째 문서 업데이트
    // 업데이트 할 내용
    });
}
```

- update~ 함수는 수정 결과를 반환
- find~ 함수는 검색된 Document를 업데이트 후에 해당 Document 반환

**DELETE**

- deleteOne, deleteMany, findByIdAndDelete, findOneAndDelete

```jsx
async function main() {
    const deleteResult = await Post.deleteOne(query);
    const deleteResults = await Post.deleteMany(query);
    const onePost = await Post.findOneAndDelete(query);
    const postById = await Post.findByIdAndDelete(query);
}
```

- delete 관련 함수를 사용하여 Document 삭제
- find~ 함수들은 검색된 Document를 반환

### Query

- MongoDB의 query는 BSON 형식으로, 기본 문법 그대로 mongoose에서도 사용 가능

### populate

- JOIN과 유사한 기능
- Document 안에 Document를 담지 않고, ObjectID를 가지고 reference 하여 사용할 수 있는 방법을 제공해주는 함수
- aggregate 쿼리를 사용하지 않고, Document에는 reference 되는 ObjectID를 담고, 사용할 때 find 하여 하위 Document처럼 사용 가능하게 함

```jsx
const members = await ChannelMember.find().populate({path:'member_id'})
```

- **`ChannelMember`** 모델의 **`find`** 메서드를 사용하여 데이터를 조회한 후 **`populate`**를 호출
- **`ChannelMember`** 모델에서 데이터를 조회하고, **`member_id`** 필드를 **`Member`** 모델과 연결하여 관련된 데이터를 가져올 수 있음
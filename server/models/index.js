"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// sequelize.sync();

sequelize
  .sync({
    force: true
  })
  .then(() => {
    db.Uom.bulkCreate([
      {
        name: "Lỗi"
      },
      {
        name: "Kiện"
      },
      {
        name: "Tấm"
      },
      {
        name: "Bộ"
      },
      {
        name: "Cái"
      },
      {
        name: "Chiếc"
      },
      {
        name: "Con"
      },
      {
        name: "Túi"
      },
      {
        name: "Gói"
      },
      {
        name: "Cuộn"
      },
      {
        name: "Thanh"
      },
      {
        name: "Cây"
      },
      {
        name: "Bao"
      },
      {
        name: "Lít"
      },
      {
        name: "Viên"
      },
      {
        name: "Hộp"
      },
      {
        name: "Lọ"
      },
      {
        name: "Đôi"
      },
      {
        name: "Vỉ"
      },
      {
        name: "M"
      },
      {
        name: "Mét"
      },
      {
        name: "Vòng"
      },
      {
        name: "Tờ"
      },
      {
        name: "Bình"
      },
      {
        name: "Thùng"
      },
      {
        name: "M3"
      },
      {
        name: "cm"
      },
      {
        name: "day"
      },
      {
        name: "gram"
      },
      {
        name: "hour"
      },
      {
        name: "kg"
      },
      {
        name: "km"
      },
      {
        name: "mg"
      },
      {
        name: "minute"
      },
      {
        name: "mm"
      },
      {
        name: "month"
      },
      {
        name: "meter"
      },
      {
        name: "second"
      },
      {
        name: "week"
      },
      {
        name: "year"
      }
    ]);
    db.Workcenter.bulkCreate([
      {
        name: "Cắt bắn khung xương"
      },
      {
        name: "Ép"
      },
      {
        name: "Dán"
      },
      {
        name: "CNC"
      },
      {
        name: "Hoàn thiện đóng gói"
      }
    ]);
    db.User.bulkCreate([
      {
        name: "Woodsland Admin",
        username: "admin",
        email: "admin@woodsland.com.vn",
        password: "$2b$10$8bXILePpqXDjdIa7tMv/UubYYKh9DrceFwKmQGdzY0sJPpGzpdI8q"
      },
      {
        name: "Woodsland App",
        username: "woodsland01",
        email: "woodsland@woodsland.com.vn",
        password: "$2b$10$8bXILePpqXDjdIa7tMv/UubYYKh9DrceFwKmQGdzY0sJPpGzpdI8q"
      }
    ]);
    db.Product.bulkCreate([
      {
        name: "Cánh phải",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Khuôn dọc BL phải",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Khuôn dọc khóa  phải",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Ốp khuôn dọc",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Khuôn ngang",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Ốp khuôn ngang 1",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Nẹp dọc 1",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      },
      {
        name: "Nẹp ngang 1",
        active: true,
        purchaseOk: false,
        saleOk: true,
        type: "chitiet"
      }
    ]);
    db.Contact.bulkCreate([
      {
        name: "DA001",
        description: "Dự án số 1",
        addressLine: "Từ Liêm",
        city: "Hà Nội",
        email: "duan@noithatzip.com.vn",
        phone: "0374638603",
        note: "Test dự án mẫu",
        UserId: 1,
        state: "Mới tạo"
      },
      {
        name: "DA002",
        description: "Dự án số 2",
        addressLine: "Từ Liêm",
        city: "Hà Nội",
        email: "duan@noithatzip.com.vn",
        phone: "0374638603",
        note: "Test dự án mẫu",
        UserId: 1,
        state: "Mới tạo"
      },
      {
        name: "DA003",
        description: "Dự án số 3",
        addressLine: "Từ Liêm",
        city: "Hà Nội",
        email: "duan@noithatzip.com.vn",
        phone: "0374638603",
        note: "Test dự án mẫu",
        UserId: 1,
        state: "Mới tạo"
      },
      {
        name: "DA004",
        description: "Dự án số 4",
        addressLine: "Từ Liêm",
        city: "Hà Nội",
        email: "duan@noithatzip.com.vn",
        phone: "0374638603",
        note: "Test dự án mẫu",
        UserId: 1,
        state: "Mới tạo"
      }
    ]);
    db.Order.bulkCreate([
      {
        id: 2,
        description: "Dự án 2",
        note: null,
        active: true,
        version: "1",
        stage: "New",
        dateFinished: "2019-09-26T00:00:00.000Z",

        ContactId: 2,
        UserId: 1
      },
      {
        id: 1,
        description: "Gói thầu 1",
        note: null,
        active: true,
        version: "1",
        stage: "New",
        dateFinished: "2019-09-19T00:00:00.000Z",
        ContactId: 1,
        UserId: 1
      }
    ]);
    //
    db.Routing.bulkCreate([
      {
        code: "QTNT-01/1",
        name:
          "Quy trình sản xuất & kiểm soát chất lượng cánh cửa gỗ công nghiệp",
        note:
          "Quy trình này quy định phương pháp, cách thức sản xuất và kiểm soát chất lượng sản phẩm Cánh cửa thương hiệu WOODSLAND DOORS, nhằm đảm bảo các sản phẩm được sản xuất ra đúng tiêu chuẩn chất lượng hiện hành của Công ty và phù hợp với các yêu cầu của khách hàng",
        active: true
      },
      {
        code: "QTNT-01/3",
        name: "Quy trình sản xuất & kiểm soát chất lượng đồ gỗ nội thất phẳng",
        note:
          "Quy trình này quy định phương pháp, cách thức sản xuất và kiểm soát chất lượng sản phẩm Cánh cửa thương hiệu WOODSLAND DOORS, nhằm đảm bảo các sản phẩm được sản xuất ra đúng tiêu chuẩn chất lượng hiện hành của Công ty và phù hợp với các yêu cầu của khách hàng",
        active: true
      }
    ]);
    //Production
    db.Production.bulkCreate([
      {
        name: "LSX0001",
        origin: "",
        productDimension: "2150x50x19.4",
        productQty: 250,
        productUom: "Cái",
        ProductId: 1,
        RoutingId: 1
      }
    ]);
    db.RoutingWorkcenter.bulkCreate([
      {
        name: "Ván mặt, Khung xương",
        note: "Ván mặt chuẩn bị theo: QTNT-01/HD-01: HD ép laminate",
        worksheet:
          "Kích thước tấm mặt cắt theo bản vẽ, để độ dư gia công mỗi chiều là 2-4mm.",
        active: true,
        RoutingId: 1,
        WorkcenterId: 1
      },
      {
        name: "Ép mặt lên khung xương",
        note:
          "Sản phẩm ép xong không bị bong tách, keo xì đều lắp mỏng bên mép cạnh",
        worksheet:
          "Trách nhiệm: Xưởng sản xuất Ép mặt lên khung xương theo: QTNT-01/HD-02.",
        active: true,
        RoutingId: 1,
        WorkcenterId: 2
      },
      {
        name: "Dán cạnh",
        note:
          "Cạnh sau khi dán không bị bong tách, không bị mẻ, không gọt vào mặt",
        worksheet: "Trách nhiệm: Xưởng sản xuất.",
        active: true,
        RoutingId: 1,
        WorkcenterId: 3
      },
      {
        name: "Gia công phần lắp PK và họa tiết trang trí",
        note:
          "Gia công đúng mã phụ kiện, kích thước bản vẽ chỉ định. Đúng chiều mở, số lượng mã, bộ",
        worksheet: "Trách nhiệm: Bộn phận Tinh chế.",
        active: true,
        RoutingId: 1,
        WorkcenterId: 4
      },
      {
        name: "Đóng gói chờ xuất hàng",
        note: "Kích thước: trong dung sai",
        worksheet: "Trách nhiệm: QC",
        active: true,
        RoutingId: 1,
        WorkcenterId: 5
      }
    ]);
  })
  .then(() => {
    //Workorder
    db.RoutingWorkcenter.findAll().then(routingWorkcenter => {
      console.log(routingWorkcenter);
    });
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

import { ElMessageBox } from "element-plus";

const MessageBox = (str) => {
    ElMessageBox.alert(str, "提示：", {
        confirmButtonText: "确认",
    });
}

export default {MessageBox}
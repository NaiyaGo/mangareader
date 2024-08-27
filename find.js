const fs = require('fs');
const path = require('path');

// 需要查找的文件名
const targetFileName = 'fileposData.json'; // 修改为你要查找的文件名

function findFile(dirPath) {
    try {
        // 读取目录中的内容
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                // 如果是目录，则递归查找
                findFile(itemPath);
            } else if (item === targetFileName) {
                // 如果找到指定文件，输出其路径
                console.log(`找到文件: ${itemPath}`);
            }
        }
    } catch (error) {
        // 如果无法访问目录，则打印错误信息
        console.error(`无法访问: ${dirPath}`);
    }
}

// 获取当前工作目录（项目根目录）
const rootDirectory = process.cwd();
findFile(rootDirectory);

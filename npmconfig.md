#### 使用华为镜像

```shell
#清空缓存
npm cache clean -f
# 设置华为镜像源
npm config set registry https://mirrors.huaweicloud.com/repository/npm/

## electron加速
# 把浏览器引擎驱动镜像改成国内镜像
npm config set chromedriver_cdnurl https://mirrors.huaweicloud.com/chromedriver
# 把electron镜像改成国内镜像
npm config set electron_mirror https://mirrors.huaweicloud.com/electron/
# 把electron_builder_binaries镜像改成国内镜像
npm config set electron_builder_binaries_mirror https://mirrors.huaweicloud.com/electron-builder-binaries/

# 如果安装了yarn，把yarn镜像也改成国内镜像
yarn config set registry https://mirrors.huaweicloud.com/repository/npm/

```
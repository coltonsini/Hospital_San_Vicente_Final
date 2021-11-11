const bcrypt = import('bcryptjs');

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

module.exports = encryptPassword;
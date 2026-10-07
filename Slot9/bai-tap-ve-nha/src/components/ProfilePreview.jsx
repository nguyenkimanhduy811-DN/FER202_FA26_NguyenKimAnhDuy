import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { majors } from '../data/profileData';

const MAX_BIO = 150;

function ProfilePreview() {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const handleNameKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFullName('');
    }
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value.slice(0, MAX_BIO));
  };

  const remaining = MAX_BIO - bio.length;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-heading">
          <h1>Hồ sơ cá nhân</h1>
          <p>
            Nhập thông tin để xem trước hồ sơ trực tiếp
          </p>
        </div>

        <div className="profile-grid">
          {/* Form */}
          <Card className="profile-card shadow-sm">
            <Card.Body>
              <h2 className="profile-section-title">
                Thông tin
              </h2>

              <Form
                onSubmit={(e) =>
                  e.preventDefault()
                }
              >
                <Form.Group className="mb-3">
                  <Form.Label>
                    Họ tên
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    onKeyDown={handleNameKeyDown}
                    onFocus={() =>
                      setFocused('fullName')
                    }
                    onBlur={() =>
                      setFocused('')
                    }
                    className={
                      focused === 'fullName'
                        ? 'border-primary border-2'
                        : ''
                    }
                    placeholder="Nhập họ tên..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Chuyên ngành
                  </Form.Label>

                  <Form.Select
                    value={major}
                    onChange={(e) =>
                      setMajor(e.target.value)
                    }
                  >
                    {majors.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Giới thiệu
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={bio}
                    onChange={handleBioChange}
                    maxLength={MAX_BIO}
                    placeholder="Giới thiệu bản thân..."
                  />

                  <div
                    className={
                      remaining < 20
                        ? 'bio-counter danger'
                        : 'bio-counter'
                    }
                  >
                    Còn {remaining}/{MAX_BIO} ký tự
                  </div>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>
                    Mật khẩu
                  </Form.Label>

                  <InputGroup>
                    <Form.Control
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Nhập mật khẩu..."
                    />

                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (s) => !s
                        )
                      }
                    >
                      {showPassword
                        ? 'Ẩn'
                        : 'Hiện'}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Preview */}
          <Card className="profile-card preview-card shadow-sm">
            <Card.Body>
              <h2 className="profile-section-title">
                Xem trước
              </h2>

              <div className="preview-box">
                <div className="preview-avatar">
                  {fullName.trim()
                    ? fullName
                        .trim()
                        .charAt(0)
                        .toUpperCase()
                    : '?'}
                </div>

                <h3 className="preview-name">
                  {fullName.trim() ||
                    'Chưa nhập tên'}
                </h3>

                <div className="preview-major">
                  {major}
                </div>

                <div className="preview-divider" />

                {bio.trim() ? (
                  <p className="preview-bio">
                    {bio}
                  </p>
                ) : (
                  <p className="preview-bio empty">
                    Chưa có giới thiệu
                  </p>
                )}

                <div className="preview-password">
                  Mật khẩu: {password.length} ký tự
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;